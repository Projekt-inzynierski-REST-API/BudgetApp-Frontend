import { React, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

import {
  StyledPage,
  HeaderGeneralInformation,
  HeaderMembers,
  GroupInfoContainer,
  StyledTableContainer,
} from "../GroupDetails/StyledGroupDetails.style";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { AddToGroupForm } from "../../components/organisms/AddToGroupForm/AddToGroupForm";
import { AddMemberButton } from "../../components/atoms/AddMemberButton/AddMemberButton";
import { MembersTable } from "../../components/organisms/MembersTable/MembersTable";
import { GroupInfo } from "../../components/organisms/GroupInfo/GroupInfo";

export const GroupDetails = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  // Sprawdź, czy location.state zawiera oczekiwane dane
  if (!location.state || !location.state.data) {
    // Przekieruj użytkownika lub wyrenderuj komunikat
    return <Navigate to="/HomePage" />;
  }

  const recaivedData = location.state.data; // odczytuje przekazane dane o grupie
  console.log(`dane przeslanej grupy: ${JSON.stringify(recaivedData)}`);


  const handleAddMemberClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  return (
    <>
      <AddToGroupForm isOpen={isAddFormOpen} onClose={handleAddFormClose} groupName={recaivedData.group_name} />
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <HeaderGeneralInformation>General information</HeaderGeneralInformation>
        <GroupInfoContainer>
          <GroupInfo data={recaivedData}/>
        </GroupInfoContainer>
        <HeaderMembers>
          Members
          <AddMemberButton onClick={handleAddMemberClick} />
        </HeaderMembers>
        <StyledTableContainer>
          <MembersTable membersDetails={recaivedData.members} groupId={recaivedData.group_id}/>
        </StyledTableContainer>
      </StyledPage>
    </>
  );
};
