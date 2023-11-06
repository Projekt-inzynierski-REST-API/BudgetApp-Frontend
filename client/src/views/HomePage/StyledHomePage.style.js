import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #add8e6, #d8bfd8);
  display: flex;
`;

const LeftSection = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  width: 30%;

  display: flex;
  justify-content: center;
`;

const StyledSelectionBar = styled.div`
  height: 6vh;
  margin-top: 10vh;
`;
const LeftSectionRightPanel = styled.div`
  margin-left: 5vh;
`;

const LeftSectionLeftPanel = styled.div``;

const ExpenseHistorySection = styled.div`
  margin: 10vh;
`;

export {
  StyledPage,
  RightSection,
  LeftSection,
  StyledSelectionBar,
  LeftSectionRightPanel,
  LeftSectionLeftPanel,
  ExpenseHistorySection,
};
