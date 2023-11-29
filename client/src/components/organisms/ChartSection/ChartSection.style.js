import styled from "styled-components";

const StyledChartSection = styled.div`
  height: 430px; /* Ustaw odpowiedni procent wysokości */
  overflow: hidden;
  max-height: 900px;

  @media (max-width: 800px) {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledChartSection };
