import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GroupName,
  Headline,
  RowsContainer,
  Row,
  AvatarContainer,
  RemoveFromGroup,
} from "./YoursGroups.style";
import { ConfirmRemoveGroup } from "../ConfirmRemoveGroup/ConfirmRemoveGroup";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const YoursGroups = ({ allGroups, getAllGroups }) => {
  console.log(allGroups);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [groupToRemove, setGroupToRemove] = useState(false);
  const navigate = useNavigate();

  const handleGroupDetails = (groupId) => {
    console.log(`kliknięto grupe o id: ${groupId}`);
    const selectedObject = allGroups.find((obj) => obj.group_id === groupId); // szukam w tablicy obiektu dla grupy o konkretnym id
    // tworze nowy obiekt z detailsami grupy
    const groupDetailsObject = {
      group_name: selectedObject.group_name,
      group_id: selectedObject.group_id,
      created_date: selectedObject.created_date,
    };
    // console.log(groupDetailsObject);
    navigate("/GroupDetails", { state: { groupDetailsObject } });
  };

  const handleConfirmOpen = (group, event) => {
    event.stopPropagation(); // Zatrzymaj propagację zdarzeń
    setGroupToRemove(group);
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmRemoveGroup
        isOpen={isConfirmOpen}
        onClose={handleConfirmClose}
        groupToRemove={groupToRemove}
        getAllGroups={getAllGroups}
      />
      <Headline>Your's groups</Headline>
      <RowsContainer>
        {allGroups.map((group) => (
          <Row
            key={group.group_id}
            onClick={() => handleGroupDetails(group.group_id)}
          >
            <AvatarContainer>
              <Avatar
                sx={{ width: 60, height: 60 }}
                alt={group.group_name}
                src={"/images/groups/avatar_1.png"}
              />
            </AvatarContainer>
            <GroupName>{group.group_name}</GroupName>
            <RemoveFromGroup>
              <IconButton
                aria-label="delete"
                sx={{ color: "#fffff0" }}
                onClick={(e) => {
                  e.stopPropagation(); // Zatrzymaj propagację zdarzeń
                  handleConfirmOpen(group, e); // Przekaż obiekt grupy, oraz obiekt zdarzenia do funkcji handleConfirmOpen
                }}
              >
                <DeleteIcon />
              </IconButton>
            </RemoveFromGroup>
          </Row>
        ))}
      </RowsContainer>
    </>
  );
};
