import styled from "styled-components";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  display: flex;

  margin: 3% 20%;

  justify-content: space-between; /* Ustawia elementy na krańcach kontenera */
  align-items: center; /* Centralizuje elementy w pionie */

  @media (max-width: 768px) {
    flex-direction: column; /* Zmiana układu na "elementy pod sobą" */
    align-items: flex-start; /* Ustawia elementy od lewej strony */
    margin: 3% 5%; /* Nowe marginesy dostosowane do węższego ekranu */
  }
`;

const ExpensesWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5vh;
`;

const FirstHeader = styled.h2`
  color: #272540;
  font-size: 50px;
  font-variant: small-caps;
  width: 95%;
`;

const AddExpenseButton = styled(Button)`
  width: 25%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  overflow: auto;
`;

export {
  Wrapper,
  FirstHeader,
  AddExpenseButton,
  ExpensesWrapper,
  MainContainer,
  Content,
};
