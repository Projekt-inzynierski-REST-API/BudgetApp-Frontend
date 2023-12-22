import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { InputAdornment, OutlinedInput } from "@mui/material";

export const ChangeAccountBalanceForm = ({
  isOpen,
  onClose,
  groupObject,
  getGroupInfo,
}) => {
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [accountBalance, setAccountBalance] = useState(false);

  const handleClose = () => onClose(false);
  const handleBalanceChange = (event) => setAccountBalance(event.target.value);

  const changeBalance = async () => {
    // nie można wysłać pustego
    if (accountBalance) {
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
                amount: accountBalance
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
    }
    getGroupInfo();
    handleClose();
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            margin="dense"
            type="number"
            fullWidth
            value={accountBalance}
            onChange={handleBalanceChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={changeBalance}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
