import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupName, Headline, RowsContainer, Row, AvatarContainer, RemoveFromGroup } from './YoursGroups.style';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const YoursGroups = ({groupsJson}) => {

  const [groupsArray, setGroupsArray] = useState(groupsJson.groups);
  const navigate = useNavigate();

  const handleGroupDetails = (groupId) => {
    console.log(`kliknięto grupe o id: ${groupId}`);
    const groupObject = groupsArray.find(obj=> obj.group_id === groupId); // szukam w tablicy obiektu dla grupy o konkretnym id
    navigate("/GroupDetails", {state: {data: groupObject}});
  };

  const handleDeleteClick = (groupId) => {
    // Filtruj tablicę grup, aby usunąć grupę o podanym groupId
    const updatedGroups = groupsArray.filter(group => group.groupId !== groupId);
    // Ustaw nową tablicę grup w stanie komponentu
    setGroupsArray([updatedGroups]);
  };

  useEffect(() => {
    console.log(groupsArray);
  },[groupsArray]);

  return (
    <>
        <Headline>Your's groups</Headline>
        <RowsContainer>
          {
            groupsArray.map((group) => (
              <Row key={group.group_id} onClick={() => handleGroupDetails(group.group_id)}>
                <AvatarContainer>
                  <Avatar sx={{ width: 60, height: 60 }} alt={group.group_name} src={"/images/groups/avatar_1.png"} />
                </AvatarContainer>
                <GroupName>{group.group_name}</GroupName>
                <RemoveFromGroup>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(group.group_id)}>
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