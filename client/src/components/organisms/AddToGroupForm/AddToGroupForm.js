import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export const AddToGroupForm = ({
  isOpen,
  onClose,
  groupObject,
  getGroupInfo,
}) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true); // Dodanie stanu do śledzenia poprawności adresu e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClose = () => {
    setEmail("");
    setIsValidEmail(true);
    onClose(false);
  };

  const addToGroup = async () => {
    // nie można wysłać pustego ani nie bedacego mailem
    if (email !== "" && isValidEmail) {
      try {
        const credential = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:1900/api/group/${groupObject.group_id}/add-user?email=${email}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${credential}`,
              "Content-Type": "application/json",
            },
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
        console.log(`status odp: ${JSON.stringify(data)}`);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
      getGroupInfo();
      handleClose();
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    // Walidacja adresu e-mail przy użyciu wyrażenia regularnego
    setIsValidEmail(emailRegex.test(newEmail));
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Please enter the email address of the user you want to add to the
            group:{" "}
            <span style={{ fontWeight: 600 }}>{groupObject.group_name}</span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail} // Ustawienie błędu w polu tekstowym, jeśli adres e-mail nie jest poprawny
            helperText={!isValidEmail ? "Invalid email address" : ""} // Wyświetlanie komunikatu pomocy w przypadku błędnego adresu e-mail
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addToGroup}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
