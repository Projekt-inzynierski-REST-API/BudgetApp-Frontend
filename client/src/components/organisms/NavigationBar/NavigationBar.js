import { React, useEffect } from "react";
import {
  LeftSection,
  NavigationBarField,
  RightSection,
} from "./NavigationBarField.style";
import Menu from "../../molecules/Menu/Menu";
import UserSection from "../../molecules/UserSection/UserSection";
import { useNavigate } from "react-router-dom";

function NavigationBar({ storedUser }) {
  const navigate = useNavigate();

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
