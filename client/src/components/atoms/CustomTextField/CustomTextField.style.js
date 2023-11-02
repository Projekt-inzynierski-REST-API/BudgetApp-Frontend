import TextField from "@mui/material/TextField";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  && {
    border-radius: 4px;
    width: 90%;

    &:focus {
      background-color: #f0f0f0;
    }
  }
`;

export { StyledTextField };
