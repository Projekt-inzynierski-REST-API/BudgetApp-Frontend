import React, { useState, useEffect } from "react";
import {
  PageContainer,
  StyledPage,
  CreateGroupContaier,
  YourGroupsContaier,
  CreateGroupColumn,
  YourGroupsColumn,
} from "./StyledGroupsPage.style";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";
import { AddGroupForm } from "../../components/organisms/AddGroupForm/AddGroupForm";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { YoursGroups } from "../../components/organisms/YoursGroups/YoursGroups";

export function GroupsPage() {
  // obiekt z grupami
  const [allGroups, setAllGroups] = useState(false);
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  //funkcja pobierająca wszystkie grupy z bazy danych
  const getAllGroups = async () => {
    console.log("pobieranie grupy funckja");
    try {
      const credential = localStorage.getItem("token");
      console.log(`Bearer ${credential}`);
      const response = await fetch(
        "http://localhost:8081/api/dashboard/groups",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!(response.status === 200)) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setAllGroups(data.groups);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  if (!allGroups) {
    // Jeśli dane nie zostały jeszcze pobrane "Ładowanie..."
    return <SimpleBackdrop isOpen={true} />;
  }

  return (
    <PageContainer>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <CreateGroupColumn>
          <CreateGroupContaier>
            <AddGroupForm getAllGroups={getAllGroups} />
          </CreateGroupContaier>
        </CreateGroupColumn>
        <YourGroupsColumn>
          <YourGroupsContaier>
            <YoursGroups allGroups={allGroups} getAllGroups={getAllGroups} />
          </YourGroupsContaier>
        </YourGroupsColumn>
      </StyledPage>
    </PageContainer>
  );
}
