import { React } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export const AddToGroupForm = ({ isOpen, onClose, groupName }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
          Please enter the email address of the user you want to add to the group: <span style={{fontWeight: 600}}>{groupName}</span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
