import React from "react";
import CustomTextField from "../../atoms/CustomTextField/CustomTextField";
import { StyledInputTextWithIcon } from "./TextFieldWithIcon.style";

function TextFieldWithIcon(props) {
  return (
    <StyledInputTextWithIcon>
      {props.icon}
      <CustomTextField {...props}></CustomTextField>
    </StyledInputTextWithIcon>
  );
}

export default TextFieldWithIcon;
