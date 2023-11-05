import React from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";

import {
  StyledProfileName,
  StyledEmailName,
  StyledNamingSection,
} from "./ProfileName.style";

function ProfileName({ userName, userEmail }) {
  return (
    <>
      <StyledNamingSection>
        <StyledProfileName>
          Hi, {userName}{" "}
          <WavingHandIcon style={{ color: "darkblue", marginLeft: "1vh" }} />
        </StyledProfileName>
        <StyledEmailName>{userEmail}</StyledEmailName>
      </StyledNamingSection>
    </>
  );
}

export default ProfileName;
