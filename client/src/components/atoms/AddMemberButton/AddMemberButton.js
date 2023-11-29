import React from 'react'
import { StyledButton } from './AddMemberButton.style'
export const AddMemberButton = ({onClick}) => {
  return (
    <StyledButton
    value="Add member"
    variant="contained"
    color="success"
    onClick={onClick}
  >
    Add Member
  </StyledButton>
  )
}