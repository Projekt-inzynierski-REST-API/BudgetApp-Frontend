import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #add8e6, #d8bfd8);
  display: flex;
  flex-direction: column;
`;

const HeaderGeneralInformation = styled.div`
  width: 95%;
  align-self: center;
  text-align: left;
  padding: 20px 20px;
  color: black;
  font-size: 32px;
  font-weight: 600;
`;

const GroupInfoContainer = styled.div`
  width: 90%;
  min-height: 15vh;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
`;

const HeaderMembers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-self: center;
  text-align: left;
  padding: 20px 20px;
  color: black;
  font-size: 32px;
  font-weight: 600;
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
  GroupInfoContainer,
  StyledTableContainer
};
