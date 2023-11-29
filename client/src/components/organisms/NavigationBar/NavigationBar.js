import React from "react";
import {
  LeftSection,
  NavigationBarField,
  RightSection,
} from "./NavigationBarField.style";
import Menu from "../../molecules/Menu/Menu";
import User from "../../molecules/SearchBar/SearchBar";
import UserSection from "../../molecules/UserSection/UserSection";

function NavigationBar({ storedUser }) {


  // console.log(storedUser);

  return (
    <>
      <NavigationBarField>
        <LeftSection>
          <Menu></Menu>
        </LeftSection>
        <RightSection>
          <UserSection storedUser={storedUser}></UserSection>
        </RightSection>
      </NavigationBarField>
    </>
  );
}

export default NavigationBar;
