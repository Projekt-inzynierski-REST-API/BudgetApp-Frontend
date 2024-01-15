import { useNavigate } from "react-router-dom";
import React from "react";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import ProfileName from "../../atoms/ProfileName/ProfileName";
import { StyledUserSection } from "./UserSection.style";
import { useEffect } from "react";

function UserSection({ storedUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      alert("Musisz się pierwsze zalogować!");
      navigate("/");
    }
  }, [storedUser]);
  if (!storedUser) {
    return null;
  }

  return (
    <>
      <StyledUserSection>
        <ProfileName
          userName={storedUser.name}
          userEmail={storedUser.email}
        ></ProfileName>
        <ProfileImage userImage={storedUser.picture}></ProfileImage>
      </StyledUserSection>
    </>
  );
}

export default UserSection;
