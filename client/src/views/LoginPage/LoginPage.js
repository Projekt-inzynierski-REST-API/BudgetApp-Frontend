import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserCardLoginPage from "../../components/organisms/UserCardLoginPage/UserCardLoginPage";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import { StyledPage, GoogleButton } from "./StyledLoginPage.style";

/* global google */
const CLIENT_ID =
  "627005936862-g942r7eqn2505l8f0nirkfl8lgb8ls8f.apps.googleusercontent.com";
const SCOPES =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email";

function LoginPage() {
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [tokenClient, setTokenClient] = useState({});
  const [authorized, setAuthorized] = useState(false);

  async function loginUser(tokenJWT, userObject) {
    try {
      const response = await fetch("http://localhost:1900/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenJWT,
        },
      });

      if (response.status === 200) {
        navigate("/HomePage");
      } else {
        throw new Error("Nie udało się zalogować");
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      throw error;
    }
  }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    setStoredUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    localStorage.setItem("token", response.credential);

    const newTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        console.log(
          "Google Calendar Access Token:",
          tokenResponse.access_token
        );
        localStorage.setItem("access_token", tokenResponse.access_token);

        verifyUserIdentity(
          response.credential,
          tokenResponse.access_token,
          userObject
        ).catch((error) =>
          console.error("Weryfikacja tożsamości nieudana:", error)
        );
      },
    });
    newTokenClient.requestAccessToken({ prompt: "consent" });
    setTokenClient(newTokenClient);
  }

  async function verifyUserIdentity(idToken, accessToken, userObject) {
    const decodedJWT = jwtDecode(idToken);
    const jwtEmail = decodedJWT.email;

    const calendarApiResponse = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!calendarApiResponse.ok) {
      throw new Error("Nie udało się uzyskać danych z Google Calendar API");
    }

    const calendarData = await calendarApiResponse.json();
    const userCalendar = calendarData.items.find(
      (item) => item.id === jwtEmail
    );

    if (userCalendar) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      alert(
        "Użyj wspólnego konta do uzyskania dostępu do kalendarza Google oraz autoryzacji!"
      );
    }
  }

  useEffect(() => {
    if (typeof google !== "undefined") {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        logo_alignment: "left",
      });
    } else {
      console.error("Google API is not loaded");
    }
  }, []);

  useEffect(() => {
    console.log("Authorized:", authorized, "Stored User:", storedUser);
    if (authorized) {
      loginUser(localStorage.getItem("token"), storedUser);
    }
  }, [authorized, storedUser]);

  return (
    <>
      <StyledPage>
        <LoginForm>
          <GoogleButton id="signInDiv"></GoogleButton>
        </LoginForm>
      </StyledPage>
    </>
  );
}

export default LoginPage;
