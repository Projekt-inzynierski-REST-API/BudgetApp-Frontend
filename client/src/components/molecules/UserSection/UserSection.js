import React from "react";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import ProfileName from "../../atoms/ProfileName/ProfileName";
import { StyledUserSection } from "./UserSection.style";

function UserSection({ storedUser }) {
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
