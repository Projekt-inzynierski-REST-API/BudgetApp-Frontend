import styled from "styled-components";

const CardContainer = styled.div`
  width: 500px;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 6px 6px 6px 6px black;
  background-color: white;
  backdrop-filter: blur(5px); /* Zmniejszam wartość filtra tła */
  background: linear-gradient(
    to right top,
    rgba(200, 200, 200, 0.15),
    rgba(200, 200, 200, 0.15)
  );
`;

const UserInfo = styled.div`
  /* Inne style dla UserInfo */
  display: flex;
  align-items: center;
  text-align: center;
  margin: 8px 0;

  & > div {
    flex-grow: 1;
    height: 1px;
    background-color: black;
    margin: 0 2%;
  }
`;

const InputFields = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogInOption = styled.div`
  margin-top: 3%;
`;

export { CardContainer, UserInfo, LogInOption, InputFields };
