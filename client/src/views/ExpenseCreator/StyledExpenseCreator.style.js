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
  font-size: 50px;
  width:95%;
`;

const SecondHeader = styled.h2`
  font-size: 40px;
  width:95%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
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
  SecondHeader,
  Form,
  FormRow,
  AddExpenseButton,
  MyLocalizationProvider,
  Column,
  ButtonContainer
};
