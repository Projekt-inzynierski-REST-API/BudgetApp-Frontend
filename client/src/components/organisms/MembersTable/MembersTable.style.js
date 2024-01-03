import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'default',
    [theme.breakpoints.down('1020')]: {
      // Dodaj stylizację dla ekranów o szerokości mniejszej lub równej 1020px
      fontSize: 16
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: "#EEFFE6",
    background: "rgba(0, 0, 0, 0.3)",
    cursor: "default",
    [theme.breakpoints.down('1020')]: {
      // Dodaj stylizację dla ekranów o szerokości mniejszej lub równej 1020px
      fontSize: 14
    },
  },
}));

const RemoveMemberButton = styled(Button)`
  font-size: 14px;
  @media (max-width: 850px) {
    font-size: 12px;
  }
`;

export { StyledTableCell, RemoveMemberButton };
