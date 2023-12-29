import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(to bottom, #add8e6, #d8bfd8); */
  display: flex;
  flex-direction: column;
`;

const HeaderGeneralInformation = styled.div`
  width: 95%;
  font-family: Arial, Helvetica, sans-serif;
  font-variant: small-caps;
  align-self: center;
  text-align: left;
  padding: 20px 20px 10px 20px;
  color: black;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
`;

const GroupInfoContainer = styled.div`
  width: 90%;
  align-self: center;
  /* min-height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 30px 40px; */
`;

const HeaderMembers = styled.div`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-variant: small-caps;
  justify-content: space-between;
  width: 95%;
  align-self: center;
  text-align: left;
  padding: 20px 20px;
  color: black;
  font-size: 32px;
  font-weight: 600;
`;

const ButtonsContainer = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
`;

const StyledTableContainer = styled(TableContainer)`
  && {
    width: 95%;
    min-height: 20vh;
    align-self: center;
  }
`;

export {
  StyledPage,
  HeaderGeneralInformation,
  HeaderMembers,
  ButtonsContainer,
  GroupInfoContainer,
  StyledTableContainer,
};
