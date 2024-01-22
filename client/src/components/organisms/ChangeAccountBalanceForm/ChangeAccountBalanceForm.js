import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { HelperText } from "./ChangeAccountBalance.style";

export const ChangeAccountBalanceForm = ({
  isOpen,
  onClose,
  groupObject,
  getGroupInfo,
}) => {
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [accountBalance, setAccountBalance] = useState(false);
  const [isValidAccountBalance, setIsValidAccountBalance] = useState(false);
  const [displayHelperText, setDisplayHelperText] = useState(false);
  const handleClose = () => {
    onClose(false);
    setDisplayHelperText(false);
    setAccountBalance(false);
  };
  const handleBalanceChange = (event) => {
    const newAccountBalance = event.target.value;
    // Sprawdź, czy wartość jest liczbą
    setIsValidAccountBalance(
      !isNaN(parseFloat(newAccountBalance)) && isFinite(newAccountBalance)
    );
    setAccountBalance(newAccountBalance);
  };

  const changeBalance = async () => {
    // nie można wysłać pustego ani nie liczby
    if (accountBalance && isValidAccountBalance) {
      try {
        const credential = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:1900/api/account-balance/add`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${credential}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupId: groupObject.group_id,
              amount: accountBalance,
            }),
          }
        );
        if (!response.status === 200) {
          if (response.status === 401) {
            console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
          } else {
            console.error(`Błąd HTTP: ${response.status}`);
          }
          return;
        }
        const data = await response.json();
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
      getGroupInfo();
      handleClose();
    } else setDisplayHelperText(true);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Set account balance for user{" "}
            <span style={{ fontWeight: 600 }}>
              {storedUser.given_name} {storedUser.family_name}
            </span>{" "}
            in group
            <span style={{ fontWeight: 600 }}> {groupObject.group_name}</span>
          </DialogContentText>
          <OutlinedInput
            autoFocus
            id="account_balance"
            startAdornment={
              <InputAdornment position="start">zł</InputAdornment>
            }
            margin="dense"
            type="number"
            fullWidth
            value={accountBalance}
            onChange={handleBalanceChange}
          />
          {displayHelperText && (
            <HelperText>You must enter a number!</HelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={changeBalance}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
