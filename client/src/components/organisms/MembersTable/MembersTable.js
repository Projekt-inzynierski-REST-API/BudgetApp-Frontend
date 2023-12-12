import { React, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { StyledTableCell } from "./MembersTable.style";
import { ConfirmRemoveMember } from "../ConfirmRemoveMember/ConfirmRemoveMember";

export const MembersTable = ({ groupObject, groupId, getGroupInfo }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(false);
  console.log('objekt: ', groupObject);
  // console.log(typeof membersDetails);
  const handleConfirmOpen = (member) => {
    setMemberToRemove(member);
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmRemoveMember
        isOpen={isConfirmOpen}
        onClose={handleConfirmClose}
        memberToRemove={memberToRemove}
        groupId={groupId}
        getGroupInfo={getGroupInfo}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Account Balance</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupObject.members.map((member) => (
            <TableRow
              key={member.member.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center">
                {member.member.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {member.member.surname}
              </StyledTableCell>
              <StyledTableCell align="center">
                {member.member.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                {member.member_account_balance}
              </StyledTableCell>
              <StyledTableCell align="right">
                {groupObject.should_show_members_account_balance && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleConfirmOpen(member.member)}
                    key={member.id}
                    startIcon={<DeleteIcon />}
                  >
                    Remove member
                  </Button>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
