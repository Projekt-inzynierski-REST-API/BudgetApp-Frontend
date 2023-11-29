import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertNoGroupOwner } from "../AlertNoGroupOwner/AlertNoGroupOwner";

export const ConfirmAddGroup = ({
  isOpen,
  onClose,
  groupToAdd,
  getAllGroups,
  setInputValue
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmClose = () => {
    setInputValue('');
    onClose(false);
  };

  const credential = localStorage.getItem("token");

  const addGroup = async (e) => {
    handleConfirmClose();
    try {
        const credential = localStorage.getItem("token");
        const access_token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:1900/api/group", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Access-Token": `${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: groupToAdd.groupName }),
        });
  
        if (!response.status === 201) {
          if (response.status === 401) {
            console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
          } else {
            console.error(`Błąd HTTP: ${response.status}`);
          }
          return;
        }
        const newGroup = await response.json();
        console.log(`dodano grupe: ${newGroup.name} o id: ${newGroup.id}`);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
      getAllGroups(); // wywołuje funkcje do pobierania wszystkich grup przekazana jako prop z GroupsPage
  };

  return (
    <>
      <AlertNoGroupOwner isOpen={isAlertOpen} onClose={handleAlertClose} />
      <Dialog
        open={isOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to add{" "}
            <span style={{ fontWeight: 600 }}>{groupToAdd.groupName}</span>, if yes
            click Add group
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addGroup(groupToAdd.group_id)}>
            Add group
          </Button>
          <Button onClick={handleConfirmClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
