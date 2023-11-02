import React from "react";

import {
  CardContainer,
  UserInfo,
  LogoutButton,
} from "./UserCardLoginPage.style";

function UserCardLoginPage(props) {
  const { userObject } = props;

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <CardContainer>
      <UserInfo>Hi {userObject.name} !</UserInfo>
      <p>If you want to change your accont, you need to log out first!</p>
      <LogoutButton onClick={handleLogout}>Log out!</LogoutButton>
    </CardContainer>
  );
}

export default UserCardLoginPage;
