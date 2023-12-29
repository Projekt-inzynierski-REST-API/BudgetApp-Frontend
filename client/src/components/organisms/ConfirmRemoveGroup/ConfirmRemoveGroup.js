import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertNoGroupOwner } from "../AlertNoGroupOwner/AlertNoGroupOwner";
import { AlertMoreUsers } from "../AlertMoreUsers/AlertMoreUsers";

export const ConfirmRemoveGroup = ({
  isOpen,
  onClose,
  groupToRemove,
  getAllGroups,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertMoreUsersOpen, setIsAlertMoreUsersOpen] = useState(false);

  const handleAlertMoreUsersOpen = () => setIsAlertMoreUsersOpen(true);
  const handleAlertMoreUsersClose = () => setIsAlertMoreUsersOpen(false);
  const handleAlertOpen = () => setIsAlertOpen(true);
  const handleAlertClose = () => setIsAlertOpen(false);
  const handleConfirmClose = () => onClose(false);

  const handleDeleteClick = () => {
    if(!groupToRemove.members.length === 1){
      handleConfirmClose();
      handleAlertMoreUsersOpen();
    }else{
      removeGroup(groupToRemove.group_id);
    }
  }
  const credential = localStorage.getItem("token");
  const removeGroup = async (group_id) => {
    handleConfirmClose();
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://localhost:1900/api/group/${group_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${credential}`,
          "Access-Token": `${access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        }else if(response.status === 400) {
          handleAlertOpen(); // wywołanie alertu że nie jesteś ownerem grupy
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
      <AlertMoreUsers isOpen={isAlertMoreUsersOpen} onClose={handleAlertMoreUsersClose} />
      <Dialog
        open={isOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to delete{" "}
            <span style={{ fontWeight: 600 }}>{groupToRemove.group_name}</span>,
            click Delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button onClick={handleConfirmClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
