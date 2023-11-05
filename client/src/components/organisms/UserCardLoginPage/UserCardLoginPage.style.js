import styled from "styled-components";

const CardContainer = styled.div`
  width: 400px;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 6px 6px 6px 6px darkgray;
  background-color: white;
  backdrop-filter: blur(5px); /* Zmniejszam wartość filtra tła */
  background: linear-gradient(
    to right top,
    rgba(200, 200, 200, 0.15),
    rgba(200, 200, 200, 0.15)
  );
`;

const UserInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export { CardContainer, UserInfo };
