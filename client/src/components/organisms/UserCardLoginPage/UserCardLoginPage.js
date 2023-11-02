import React from "react";
import CustomButton from "../../atoms/CustomButton/CustomButton";

import { CardContainer, UserInfo } from "./UserCardLoginPage.style";

function UserCardLoginPage(props) {
  const { userObject } = props;

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <>
      <CardContainer>
        <UserInfo>Hi {userObject.name} !</UserInfo>
        <p>If you want to change your accont, you need to log out first!</p>
        <CustomButton onClick={handleLogout} style={{ width: "100%" }}>
          Log out!
        </CustomButton>
      </CardContainer>
    </>
  );
}

export default UserCardLoginPage;
