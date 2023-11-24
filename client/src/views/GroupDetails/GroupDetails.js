import { React, useEffect, useState } from "react";
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
  const [groupDetailsObject, setGroupDetailsObject] = useState(location.state?.groupDetailsObject); // odczytuje przekazane dane o grupie
  const [tableKey, setTableKey] = useState(1); // Unikalny klucz komponentu

  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Sprawdź, czy location.state zawiera oczekiwane dane
  if (!groupDetailsObject) {
    // Przekieruj użytkownika lub wyrenderuj komunikat
    return <Navigate to="/HomePage" />;
  }

  //funkcja pobierająca wszystkie grupy z bazy danych
  const getAllGroups = async () => {
    try {
      const credential = localStorage.getItem("token");
      console.log(`Bearer ${credential}`);
      const dataToSend = { rows_number: 1 };

      const response = await fetch(
        `http://localhost:1900/api/groups/${groupDetailsObject.group_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend)
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
      console.log(data);
      // setGroupDetailsObject(data.groups[0]);
      // // Po zmianie groupDetailsObject zmien klucz, aby ponownie załadować MembersTable
      // setTableKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  getAllGroups();

  const handleAddMemberClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  // return (
  //   <>
  //     <AddToGroupForm
  //       isOpen={isAddFormOpen}
  //       onClose={handleAddFormClose}
  //       groupName={groupDetailsObject.group_name}
  //     />
  //     <NavigationBar storedUser={storedUser}></NavigationBar>
  //     <StyledPage>
  //       <HeaderGeneralInformation>General information</HeaderGeneralInformation>
  //       <GroupInfoContainer>
  //         <GroupInfo data={groupDetailsObject} />
  //       </GroupInfoContainer>
  //       <HeaderMembers>
  //         Members
  //         <AddMemberButton onClick={handleAddMemberClick} />
  //       </HeaderMembers>
  //       <StyledTableContainer>
  //         <MembersTable
  //           key={tableKey}
  //           membersDetails={groupDetailsObject.members}
  //           groupId={groupDetailsObject.group_id}
  //           getAllGroups={getAllGroups}
  //         />
  //       </StyledTableContainer>
  //     </StyledPage>
  //   </>
  // );
};
