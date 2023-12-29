import styled from "styled-components";

const StyledLastTransactionSection = styled.div`
  width: 90%;

  height: auto;
  margin-top: 3vh;
  border-radius: 12px;
  margin-bottom: 3vh;
  font-family: "Nunito", sans-serif;
  box-shadow: 6px 6px 6px 6px rgba(13, 71, 161, 0.5);

  background-color: white;
  backdrop-filter: blur(5px);
  background: linear-gradient(
    to right top,
    rgba(200, 200, 200, 0.15),
    rgba(200, 200, 200, 0.15)
  );

  h2 {
    font-family: "Roboto", sans-serif;
    margin-left: 5vh;
    margin-top: vh;
  }

  ul {
    list-style: none;
  }
  li {
    margin: 2vh;
  }
  img {
    margin-right: 1vh;
  }
`;

export { StyledLastTransactionSection };
