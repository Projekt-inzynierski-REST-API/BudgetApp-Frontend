import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: auto;
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftSection = styled.div`
  width: 70%;
  display: flex;

  @media (max-width: 1000px) {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

const RightSection = styled.div`
  width: 30%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 20px; /* Dodaj margines na górze dla odstępu od wykresu */
  }
`;

const StyledSelectionBar = styled.div`
  height: 6vh;
  margin-top: 5vh;
  width: 100%;

  display: flex;
  justify-content: center;
  @media (max-width: 1200px) {
    margin-top: 0;
    margin-bottom: 5vh;
    width: auto;
  }
`;
const LeftSectionRightPanel = styled.div`
  width: 30%;

  @media (max-width: 1000px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LeftSectionLeftPanel = styled.div`
  width: 70%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const GroupsSection = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10vh;
`;

const FirstHeader = styled.h2`
  color: #272540;
  font-size: 50px;
  font-variant: small-caps;
  width: 95%;
  margin-left: 5%;
`;

export {
  StyledPage,
  RightSection,
  LeftSection,
  StyledSelectionBar,
  LeftSectionRightPanel,
  LeftSectionLeftPanel,
  GroupsSection,
  FirstHeader,
};
