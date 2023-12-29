import React from 'react'
import { StyledButton } from './LeaveGroupButton.style'
export const LeaveGroupButton = ({onClick}) => {
  return (
    <StyledButton
    value="Leave group"
    variant="contained"
    color="error"
    onClick={onClick}
  >
    Leave Group
  </StyledButton>
  )
}