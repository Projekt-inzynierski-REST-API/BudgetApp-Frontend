import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  StyledPage,
  HeaderGeneralInformation,
  HeaderMembers,
  ButtonsContainer,
  GroupInfoContainer,
  StyledTableContainer,
  MainContainer,
  Content,
} from "../GroupDetails/StyledGroupDetails.style";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";
import { AddToGroupForm } from "../../components/organisms/AddToGroupForm/AddToGroupForm";
import { ChangeAccountBalanceForm } from "../../components/organisms/ChangeAccountBalanceForm/ChangeAccountBalanceForm";
import { AddMemberButton } from "../../components/atoms/AddMemberButton/AddMemberButton";
import { ChangeAccountBalanceButton } from "../../components/atoms/ChangeAccountBalanceButton/ChangeAccountBalanceButton";
import { MembersTable } from "../../components/organisms/MembersTable/MembersTable";
import { GroupInfo } from "../../components/organisms/GroupInfo/GroupInfo";
import { LeaveGroupButton } from "../../components/atoms/LeaveGroupButton/LeaveGroupButton";
import { ConfirmLeaveGroup } from "../../components/organisms/ConfirmLeaveGroup/ConfirmLeaveGroup";
import Footer from "../../components/organisms/Footer/Footer";

export const GroupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tableKey, setTableKey] = useState(1); // Unikalny klucz komponentu
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isAccountBalanceFormOpen, setIsAccountBalanceFormOpen] =
    useState(false);
  const [groupObject, setGroupObject] = useState(false);
  const [isLeaveGroupConfirmOpen, setIsLeaveGroupConfirmOpen] = useState(false);
  const groupDetailsObject = location.state?.groupDetailsObject; // odczytuje przekazane dane o grupie

  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const checkLocationState = () => {
    // Sprawdź, czy location.state zawiera oczekiwane dane
    if (!groupDetailsObject) {
      // Przekieruj użytkownika
      navigate("/HomePage");
    }
  };

  const handleUnauthorized = () => {
    alert("Twoja sesja wygasła, zaloguj się ponownie.");
    navigate("/");
  };

  //funkcja pobierająca detailsy grupy z bazy danych
  const getGroupInfo = async () => {
    try {
      const credential = localStorage.getItem("token");
      const lastTransactionsAmount = { rows_number: 5 }; // ilość ostatnich tranzakcji grupy jakie dostane z serwera
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

      console.log(groupDetailsObject.group_id);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
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

  const handleAddMemberClick = () => setIsAddFormOpen(true);
  const handleAccountBalanceClick = () => setIsAccountBalanceFormOpen(true);
  const handleAddFormClose = () => setIsAddFormOpen(false);
  const handleAccountBalanceFormClose = () =>
    setIsAccountBalanceFormOpen(false);
  const handleLeaveGroupConfirmOpen = () => setIsLeaveGroupConfirmOpen(true);
  const handleLeaveGroupConfirmClose = () => setIsLeaveGroupConfirmOpen(false);

  return (
    <MainContainer>
      <Content>
        <ConfirmLeaveGroup
          isOpen={isLeaveGroupConfirmOpen}
          onClose={handleLeaveGroupConfirmClose}
          groupDetails={groupDetailsObject}
        />
        <AddToGroupForm
          isOpen={isAddFormOpen}
          onClose={handleAddFormClose}
          groupObject={groupDetailsObject}
          getGroupInfo={getGroupInfo}
        />
        <ChangeAccountBalanceForm
          isOpen={isAccountBalanceFormOpen}
          onClose={handleAccountBalanceFormClose}
          groupObject={groupDetailsObject}
          getGroupInfo={getGroupInfo}
        />
        <NavigationBar storedUser={storedUser}></NavigationBar>
        <StyledPage>
          <HeaderGeneralInformation>
            {groupDetailsObject.group_name}
          </HeaderGeneralInformation>
          <GroupInfoContainer>
            <GroupInfo
              data={groupDetailsObject}
              membersAmount={groupObject.members.length}
              budget={groupObject.group_budget}
            />
          </GroupInfoContainer>
          <HeaderMembers>
            Members
            <ButtonsContainer>
              {groupObject.should_show_members_account_balance ? (
                <>
                  <ChangeAccountBalanceButton
                    onClick={handleAccountBalanceClick}
                  />
                  <AddMemberButton onClick={handleAddMemberClick} />
                </>
              ) : (
                <>
                  <ChangeAccountBalanceButton
                    onClick={handleAccountBalanceClick}
                  />
                  <LeaveGroupButton onClick={handleLeaveGroupConfirmOpen} />
                </>
              )}
            </ButtonsContainer>
          </HeaderMembers>
          <StyledTableContainer>
            <MembersTable
              key={tableKey}
              groupName={groupDetailsObject.group_name}
              groupObject={groupObject}
              groupId={groupDetailsObject.group_id}
              getGroupInfo={getGroupInfo}
            />
          </StyledTableContainer>
        </StyledPage>
      </Content>
      <Footer />
    </MainContainer>
  );
};
