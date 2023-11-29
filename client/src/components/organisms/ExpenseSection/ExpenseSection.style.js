import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: 6px 6px 6px 6px darkgray;
  backdrop-filter: blur(5px);
  background: linear-gradient(
    to right top,
    rgba(200, 200, 200, 0.15),
    rgba(200, 200, 200, 0.15)
  );
  border-radius: 12px;

  margin-top: 8vh;
  height: auto;
  padding-bottom: 10px;
  padding-top: 10px;

  @media (max-width: 1000px) {
    margin-top: 0.5vh;
    margin-bottom: 2.5vh;
    width: 50%;
  }
`;

const StyledExpenseValue = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  font-size: 30px;
`;

export { Wrapper, StyledExpenseValue };
