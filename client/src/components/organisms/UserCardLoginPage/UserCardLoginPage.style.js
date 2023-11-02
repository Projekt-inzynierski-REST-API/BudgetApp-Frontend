import styled from "styled-components";
import { Button } from "@mui/material";

const CardContainer = styled.div`
  width: 400px;
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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const LogoutButton = styled(Button)`
  && {
    background-color: #bdbdbd;
    color: #212121;
    width: 100%;
    margin-top: 6%;
  }
`;

export { CardContainer, UserInfo, LogoutButton };
