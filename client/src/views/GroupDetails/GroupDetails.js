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
  const location = useLocation();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [groupObject, setGroupObject] = useState(location.state?.groupObject); // odczytuje przekazane dane o grupie
  const [tableKey, setTableKey] = useState(1); // Unikalny klucz komponentu

  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Sprawdź, czy location.state zawiera oczekiwane dane
  if (!groupObject) {
    // Przekieruj użytkownika lub wyrenderuj komunikat
    return <Navigate to="/HomePage" />;
  }

  //funkcja pobierająca wszystkie grupy z bazy danych
  const getAllGroups = async () => {
    try {
      const credential = localStorage.getItem("token");
      console.log(`Bearer ${credential}`);
      const response = await fetch(
        "http://localhost:1900/api/dashboard/groups",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.status === 200) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setGroupObject(data.groups[0]);
      // Po zmianie groupObject zmien klucz, aby ponownie załadować MembersTable
      setTableKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  const handleAddMemberClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  return (
    <>
      <AddToGroupForm
        isOpen={isAddFormOpen}
        onClose={handleAddFormClose}
        groupName={groupObject.group_name}
      />
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <HeaderGeneralInformation>General information</HeaderGeneralInformation>
        <GroupInfoContainer>
          <GroupInfo data={groupObject} />
        </GroupInfoContainer>
        <HeaderMembers>
          Members
          <AddMemberButton onClick={handleAddMemberClick} />
        </HeaderMembers>
        <StyledTableContainer>
          <MembersTable
            key={tableKey}
            membersDetails={groupObject.members}
            groupId={groupObject.group_id}
            getAllGroups={getAllGroups}
          />
        </StyledTableContainer>
      </StyledPage>
    </>
  );
};
