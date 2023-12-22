import React from 'react'
import { StyledButton } from './ChangeAccountBalanceButton.style'
export const ChangeAccountBalanceButton = ({onClick}) => {
  return (
    <StyledButton
    value="Change account balance"
    variant="contained"
    color="success"
    onClick={onClick}
  >
    Change Account Balance
  </StyledButton>
  )
}