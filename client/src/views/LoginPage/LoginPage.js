import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserCardLoginPage from "../../components/organisms/UserCardLoginPage/UserCardLoginPage";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import { StyledPage, GoogleButton } from "./StyledLoginPage.style";

function LoginPage() {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [tokenClient, setTokenClient] = useState({});

  async function loginUser(tokenJWT, userObject) {
    try {
      const response = await fetch("http://localhost:1900/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenJWT,
        },
      });

      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(userObject));
        setStoredUser(userObject);
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

    //loginUser(response.credential, userObject);
    localStorage.setItem("user", JSON.stringify(userObject));

    // zapisanie tokenu w local storage
    localStorage.setItem("token", response.credential);
    navigate("/HomePage");
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "627005936862-g942r7eqn2505l8f0nirkfl8lgb8ls8f.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "large",
      size: "medium",
      width: "200px",
      height: "50px",
      longtitle: true,
      textColor: "#ffffff",
    });

    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id:
          "627005936862-g942r7eqn2505l8f0nirkfl8lgb8ls8f.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/calendar",
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          // zapisanie access_tokenu w local storage
          localStorage.setItem("access_token", tokenResponse.access_token);
        },
      })
    );
  }, []);

  const getAccessToken = () => {
    tokenClient.requestAccessToken();
  };

  return (
    <>
      <StyledPage>
        {storedUser ? (
          <UserCardLoginPage userObject={storedUser} />
        ) : (
          <LoginForm>
            <GoogleButton id="signInDiv"></GoogleButton>
          </LoginForm>
        )}
      </StyledPage>
    </>
  );
}

export default LoginPage;
