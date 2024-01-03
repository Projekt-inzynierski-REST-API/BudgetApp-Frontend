import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertNoGroupOwner } from "../AlertNoGroupOwner/AlertNoGroupOwner";

export const ConfirmDeleteGroup = ({ isOpen, onClose, groupId, groupName }) => {
  const credential = localStorage.getItem("token");
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertClose = () => setIsAlertOpen(false);
  const handleConfirmClose = () => onClose(false);

  const leaveGroup = async (groupId) => {
    handleConfirmClose();

    try {
      const response = await fetch(
        `http://localhost:1900/api/group/${groupId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Access-Token": `${access_token}`,
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
      console.log("usunieto: " + JSON.stringify(data));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    navigate("/GroupsPage");
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
            If you want to delete group:
            <span style={{ fontWeight: 600 }}> {groupName}</span>, click Delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => leaveGroup(groupId)}>Delete</Button>
          <Button onClick={handleConfirmClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
