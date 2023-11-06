import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserCardLoginPage from "../../components/organisms/UserCardLoginPage/UserCardLoginPage";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import { StyledPage, GoogleButton } from "./StyledLoginPage.style";

function LoginPage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    const userObject = jwtDecode(response.credential);

    localStorage.setItem("user", JSON.stringify(userObject));
    navigate("/HomePage", { state: { credential: response.credential } });
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
  }, []);

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
