import React from 'react'
import { useState, useEffect } from 'react';
import { GroupName, Headline, RowsContainer, Row, AvatarContainer, RemoveFromGroup } from './YoursGroups.style';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const YoursGroups = ({groups}) => {
  // Przekształcam otrzymane dane w tablicę by móc potem użyć funkcji map na nich
  const groupsArray = Object.values(groups);

  const [newGroupsArray, setNewGroupsArray] = useState(groupsArray);

  const handleDeleteClick = (groupId) => {
    // Filtruj tablicę grup, aby usunąć grupę o podanym groupId
    const updatedGroups = groupsArray[0].filter(group => group.groupId !== groupId);
    // Ustaw nową tablicę grup w stanie komponentu
    setNewGroupsArray([updatedGroups]);
  };

  useEffect(() => {
    console.log(newGroupsArray);
  },[newGroupsArray]);

  return (
    <>
        <Headline>Your's groups</Headline>
        <RowsContainer>
          {
            newGroupsArray[0].map((group) => (
              <Row key={group.groupId}>
                <AvatarContainer>
                  <Avatar sx={{ width: 60, height: 60 }} alt={group.groupName} src={"/images/groups/" + group.avatarImg}/>
                </AvatarContainer>
                <GroupName>{group.groupName}</GroupName>
                <RemoveFromGroup>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(group.groupId)}>
                    <DeleteIcon />
                  </IconButton>
                </RemoveFromGroup>
              </Row>
            ))
          }
        </RowsContainer>
    </>
  )
}