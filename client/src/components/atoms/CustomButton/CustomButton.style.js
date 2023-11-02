import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  && {
    border-radius: 4px;
    width: 90%;
    margin-top: 3%;
    color: black;
    background-color: darkcyan;

    &:focus {
      background-color: #008080;
    }

    &:hover {
      background-color: #008080;
    }
  }
`;

export { StyledButton };
