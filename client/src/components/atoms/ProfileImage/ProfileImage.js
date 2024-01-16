import React from "react";

import { Avatar } from "@mui/material";

function ProfileImage({ userImage }) {
  return (
    <>
      <Avatar
        alt="User Image"
        src={userImage}
        sx={{ width: 50, height: 50, marginTop: 1, marginBottom: 1 }}
      />
    </>
  );
}

export default ProfileImage;
