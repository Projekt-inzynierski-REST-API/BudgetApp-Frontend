import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import TextFieldWithIcon from "../../molecules/TextFieldWithIcon/TextFieldWithIcon";

import {
  CardContainer,
  UserInfo,
  LogInOption,
  InputFields,
} from "./LoginForm.style";

function LoginForm({ children }) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <CardContainer>
      <h2>Login Form!</h2>
      <InputFields onSubmit={handleLogin}>
        <TextFieldWithIcon
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={handleEmailChange}
          icon={<MailOutlineIcon />}
          error={!isValidEmail}
          helperText={!isValidEmail && "Wprowadź poprawny adres e-mail"}
        />
        <TextFieldWithIcon
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          icon={<LockIcon />}
        />
        <CustomButton type="submit" variant="contained" color="primary">
          Submit
        </CustomButton>
      </InputFields>
      <UserInfo>
        <div></div>
        Or connect with:
        <div></div>
      </UserInfo>
      <LogInOption>{children}</LogInOption>
    </CardContainer>
  );
}

export default LoginForm;
