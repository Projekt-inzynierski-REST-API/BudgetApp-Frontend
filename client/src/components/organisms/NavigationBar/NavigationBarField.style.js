import styled from "styled-components";

const NavigationBarField = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  color: white;
  background: rgba(0,0,0,0.3);
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
  cursor: default;
`;

export { NavigationBarField, LeftSection, RightSection };
