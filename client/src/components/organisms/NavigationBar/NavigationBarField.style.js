import styled from "styled-components";

const NavigationBarField = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: 6px 6px 6px 6px darkgray;
  background-color: white;
  backdrop-filter: blur(5px);
`;
const LeftSection = styled.div`
  width: 70%;
  height: auto;

  display: flex;
`;
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  height: auto;
`;

export { NavigationBarField, LeftSection, RightSection };
