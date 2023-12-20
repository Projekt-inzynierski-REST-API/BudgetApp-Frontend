import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertNoGroupOwner } from "../AlertNoGroupOwner/AlertNoGroupOwner";

export const ConfirmRemoveGroup = ({
  isOpen,
  onClose,
  groupToRemove,
  getAllGroups,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmClose = () => {
    onClose(false);
  };

  const credential = localStorage.getItem("token");
  const removeGroup = async (group_id) => {
    handleConfirmClose();
    const access_token = localStorage.getItem("access_token");
    try {
      const response = fetch(`http://localhost:1900/api/group/${group_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${credential}`,
          "Access-Token": `${access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.status === 200) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          // !!!!!!!!!!!!!!!!DOROBIĆ OBSŁUGĘ BŁĘDU JEŚLI JEST WIĘCEJ CZŁONKÓW GRUPY NIŻ TYLKO TY!!!!!!!!!
          handleAlertOpen(); // wywołanie alertu że jest więcej członków grupy niż 1
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }
      const data = (await response).json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    getAllGroups();
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
            If you want to remove{" "}
            <span style={{ fontWeight: 600 }}>{groupToRemove.group_name}</span>,
            click Remove
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeGroup(groupToRemove.group_id)}>
            Remove
          </Button>
          <Button onClick={handleConfirmClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
