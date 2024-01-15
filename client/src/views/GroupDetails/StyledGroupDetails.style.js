import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: auto;
  background: url("images/backgrounds/background.jpg") center/cover no-repeat;
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
  color: #272540;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  cursor: default;
  @media (max-width: 1200px) {
    padding: 20px 0px 20px 0px;
  }
`;

const GroupInfoContainer = styled.div`
  width: 90%;
  align-self: center;
`;

const HeaderMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  font-variant: small-caps;
  justify-content: space-between;
  width: 95%;
  align-self: center;
  text-align: left;
  padding: 20px 20px;
  color: #272540;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  cursor: default;
  @media (max-width: 1200px) {
    padding: 20px 0px 20px 0px;
  }
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
    padding: 30px 40px;
    box-sizing: border-box;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
`;

export {
  StyledPage,
  HeaderGeneralInformation,
  HeaderMembers,
  ButtonsContainer,
  GroupInfoContainer,
  StyledTableContainer,
  MainContainer,
  Content,
};
