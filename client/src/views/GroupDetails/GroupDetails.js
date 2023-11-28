import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  StyledPage,
  HeaderGeneralInformation,
  HeaderMembers,
  GroupInfoContainer,
  StyledTableContainer,
} from "../GroupDetails/StyledGroupDetails.style";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";
import { AddToGroupForm } from "../../components/organisms/AddToGroupForm/AddToGroupForm";
import { AddMemberButton } from "../../components/atoms/AddMemberButton/AddMemberButton";
import { MembersTable } from "../../components/organisms/MembersTable/MembersTable";
import { GroupInfo } from "../../components/organisms/GroupInfo/GroupInfo";

export const GroupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tableKey, setTableKey] = useState(1); // Unikalny klucz komponentu
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [groupObject, setGroupObject] = useState(false);
  const groupDetailsObject = location.state?.groupDetailsObject; // odczytuje przekazane dane o grupie

  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const checkLocationState = () => {
            // Sprawdź, czy location.state zawiera oczekiwane dane
            if (!groupDetailsObject) {
              // Przekieruj użytkownika
              navigate('/HomePage');
            }
  }

  //funkcja pobierająca detailsy grupy z bazy danych
  const getGroupInfo = async () => {
    try {
      const credential = localStorage.getItem("token");
      const lastTransactionsAmount = { rows_number: 5 }; // ilość ostatnich tranzakcji grupy jakie dostane z serwera
      // `https://8c12db1a-4097-4f51-badc-960a0843144f.mock.pstmn.io/api/group/1`
      const response = await fetch(
        `http://localhost:1900/api/group/${groupDetailsObject.group_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lastTransactionsAmount),
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
      setGroupObject(data);
      // setGroupDetailsObject(data.groups[0]);
      // // Po zmianie groupDetailsObject zmien klucz, aby ponownie załadować MembersTable
      // setTableKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    checkLocationState();
    getGroupInfo();
  }, []);

  if (!groupObject) {
    // Jeśli dane nie zostały jeszcze pobrane "Ładowanie..."
    return <SimpleBackdrop isOpen={true} />;
  }

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
        groupObject={groupDetailsObject}
        getGroupInfo={getGroupInfo}
      />
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <HeaderGeneralInformation>General information</HeaderGeneralInformation>
        <GroupInfoContainer>
          <GroupInfo data={groupDetailsObject} budget={groupObject.group_budget} />
        </GroupInfoContainer>
        <HeaderMembers>
          Members
          <AddMemberButton onClick={handleAddMemberClick} />
        </HeaderMembers>
        <StyledTableContainer>
          <MembersTable
            key={tableKey}
            groupObject={groupObject}
            groupId={groupDetailsObject.group_id}
            getGroupInfo={getGroupInfo}
          />
        </StyledTableContainer>
      </StyledPage>
    </>
  );
};
