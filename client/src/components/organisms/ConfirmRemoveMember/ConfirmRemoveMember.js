import {React, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertNoGroupOwner } from "../AlertNoGroupOwner/AlertNoGroupOwner";

export const ConfirmRemoveMember = ({ isOpen, onClose, memberToRemove, groupId, getAllGroups }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  }

  const handleConfirmClose = () => {
      onClose(false);
  }

  const credential = localStorage.getItem("token");
  const removeMemberFromGroup = (memberIdToRemove) => {

    handleConfirmClose();

    try {
      const response = fetch(
        `http://localhost:1900/api/group/${groupId}/delete-user/${memberIdToRemove}`,
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
          // !!!!!!!!!!!!!!!!DOROBIĆ OBSŁUGĘ BŁĘDU JEŚLI NIE JESTEŚ WŁAŚCICIELEM GRUPY - alert już jest zrobiony!!!!!!!!!
          // !!!!!!!!!!!!!!!!DOROBIĆ OBSŁUGĘ BŁĘDU JEŚLI CHCESZ USUNĄĆ SIEBIE A JESTEŚ WŁAŚCICIELEM GRUPY!!!!!!!!!
          handleAlertOpen(); // wywołanie alertu że nie jesteś ownerem grupy
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }
      console.log('usunieto');
      getAllGroups();
      // const data = response.json();
      // console.log(JSON.stringify(data));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          If you want to remove the user <span style={{fontWeight:600}}>{memberToRemove.name} {memberToRemove.surname}</span> from the group, click Remove
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeMemberFromGroup(memberToRemove.id)}>
            Remove
          </Button>
          <Button onClick={handleConfirmClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
