import React from 'react'
import { StyledButton } from './ChangeAccountBalanceButton.style'
export const ChangeAccountBalanceButton = ({onClick}) => {
  return (
    <StyledButton
    value="Change account balance"
    variant="contained"
    color="secondary"
    onClick={onClick}
  >
    Change Account Balance
  </StyledButton>
  )
}