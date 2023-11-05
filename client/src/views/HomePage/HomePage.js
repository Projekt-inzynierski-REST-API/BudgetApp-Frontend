import React from "react";
import { StyledPage, RightSection, LeftSection } from "./StyledHomePage.style";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import RightSectionContent from "../../components/organisms/RightSectionContent/RightSectionContent";
function HomePage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <div>Nie znaleziono danych użytkownika.</div>;
  }

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
