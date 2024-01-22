import React from "react";
import { StyledButton } from "./ChangeAccountBalanceButton.style";
export const ChangeAccountBalanceButton = ({ onClick }) => {
  return (
    <StyledButton
      value="Change your account balance"
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
      Change Your Account Balance
    </StyledButton>
  );
};
