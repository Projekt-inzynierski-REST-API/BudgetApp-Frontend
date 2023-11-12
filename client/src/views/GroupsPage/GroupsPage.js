import React, { useState, useEffect } from "react";
import {StyledPage, CreateGroupContaier, CreateGroupSection, JoinToGroupContaier, JoinToGroupSection, YourGroupsContaier, YourGroupsSection,  } from "./StyledGroupsPage.style";
import { AddGroupForm } from "../../components/organisms/AddGroupForm/AddGroupForm";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { JoinGroupForm } from "../../components/organisms/JoinGroupForm/JoinGroupForm";
import { YoursGroups } from "../../components/organisms/YoursGroups/YoursGroups";

export function GroupsPage() {
  // pobranie tokenu z local storage
  const credential = localStorage.getItem("token");
  console.log("JWT Token from GroupPage: " + credential);
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // obiekt z grupami
  const [allGroups, setAllGroups] = useState(false);
  
  //funkcja pobierająca wszystkie grupy z bazy danych
  const getAllGroups = async () => {
    try {
      const credential = localStorage.getItem("token");
      console.log(`Bearer ${credential}`);
      const response = await fetch('https://9ac829e8-94a4-4c59-b710-132387fbbae3.mock.pstmn.io/api/dashboard/groups', {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${credential}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          console.error('Błąd uwierzytelnienia: Sprawdź poprawność tokena.');
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }
  
      const jsonData = await response.json();
      setAllGroups(jsonData);
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych:', error);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, [])

  if (!allGroups) {
    // Jeśli dane nie zostały jeszcze pobrane, możesz zwrócić np. komunikat "Ładowanie..."
    return <p>Ładowanie...</p>;
  }
  
  return (
    <>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <CreateGroupSection>
            <CreateGroupContaier>
                <AddGroupForm />
            </CreateGroupContaier>
        </CreateGroupSection>
        <JoinToGroupSection>
            <JoinToGroupContaier>
                <JoinGroupForm data={allGroups} />
            </JoinToGroupContaier>
        </JoinToGroupSection>
        <YourGroupsSection>
            <YourGroupsContaier>
                <YoursGroups groups={allGroups} />
            </YourGroupsContaier>
        </YourGroupsSection>
      </StyledPage>
    </>
  );
}