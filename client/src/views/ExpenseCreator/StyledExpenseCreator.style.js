import styled from "styled-components";
import { Button } from "@mui/material";

const StyledPage = styled.div`
  flex: 1; /* Zajmij całą dostępną przestrzeń */
  /* background: linear-gradient(to bottom, #add8e6, #d8bfd8); */
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

const HeaderContainer = styled.div`
  flex: 1;
  width: 90%;
`;

const FirstHeader = styled.h1`
  font-size: 50px;
`;

const SecondHeader = styled.h2`
  font-size: 40px;
`;

const FormContainer = styled.div`
  flex: 2;
  width: 90%;
  display: flex;
  justify-content: flex-start;
`;

const Form = styled.form`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: space-around;
`;

const AddExpenseButton = styled(Button)`
  width: 20%;
  align-self: flex-end;
  margin-top: 10px;
`;

export {
  StyledPage,
  HeaderContainer,
  FirstHeader,
  SecondHeader,
  FormContainer,
  Form,
  AddExpenseButton
};
