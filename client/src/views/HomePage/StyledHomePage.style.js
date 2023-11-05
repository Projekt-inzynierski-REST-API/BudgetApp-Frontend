import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #add8e6, #d8bfd8);
  display: flex;
`;

const LeftSection = styled.div`
  width: 70%;
`;

const RightSection = styled.div`
  width: 30%;

  display: flex;
  justify-content: center;
`;

export { StyledPage, RightSection, LeftSection };
