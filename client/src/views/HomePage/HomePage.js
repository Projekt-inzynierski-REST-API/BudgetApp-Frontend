import React from "react";
import { StyledPage, RightSection, LeftSection } from "./StyledHomePage.style";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import RightSectionContent from "../../components/organisms/RightSectionContent/RightSectionContent";
function HomePage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <div>Nie znaleziono danych użytkownika.</div>;
  }

  // pobranie tokenu z local storage
  const credential = localStorage.getItem("token");

  async function fetchLastTransaction() {
    try {
      const response = await fetch(
        "http://localhost:1900/api/dashboard/last-transactions",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + credential,
          },
        }
      );

      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Brak rekordów");
      }
    } catch (error) {
      console.error("Error coo:", error);
    }
  }

  fetchLastTransaction();



  return (
    <>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <LeftSection>
          <h1>Witaj na stronie głównej, {storedUser.name}!</h1>
        </LeftSection>

        <RightSection>
          <RightSectionContent></RightSectionContent>
        </RightSection>
      </StyledPage>
    </>
  );
}

export default HomePage;
