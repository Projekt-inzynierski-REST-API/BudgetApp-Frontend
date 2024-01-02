import styled from "styled-components";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

const StyledPage = styled.div`
  flex: 1; /* Zajmij całą dostępną przestrzeń */
  /* background: linear-gradient(to bottom, #add8e6, #d8bfd8); */
  display: flex;
  height: 100vh;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
`;

const Expense = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarEvent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 50%;
`;

const FirstHeader = styled.h1`
  color: #272540;
  font-size: 50px;
  font-variant: small-caps;
  width:95%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 850px) {
    flex-direction: column;
    align-content: center;
    align-items: normal;
  }
`;

const Column = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: space-around;
`;

const ButtonContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const AddExpenseButton = styled(Button)`
  width: 25%;
  align-self: flex-end;
`;

const MyLocalizationProvider = styled(LocalizationProvider)`
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

export {
  StyledPage,
  HeaderContainer,
  Expense,
  CalendarEvent,
  FirstHeader,
  Form,
  FormRow,
  AddExpenseButton,
  MyLocalizationProvider,
  Column,
  ButtonContainer
};
