import { React, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, RemoveMemberButton } from "./MembersTable.style";
import { ConfirmRemoveMember } from "../ConfirmRemoveMember/ConfirmRemoveMember";
import { ConfirmDeleteGroup } from "../ConfirmDeleteGroup/ConfirmDeleteGroup";

export const MembersTable = ({ groupName, groupObject, groupId, getGroupInfo }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteGroupConfirmOpen, setIsDeleteGroupConfirmOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(false);
  // pobranie danych usera(nazwa, mail itp.)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log('objekt: ', groupObject);

  const handleConfirmDeleteGroupOpen = () => {
    setIsDeleteGroupConfirmOpen(true);
  }

  const handleConfirmDeleteGroupClose = () => {
    setIsDeleteGroupConfirmOpen(false);
  }

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
      <ConfirmDeleteGroup
        isOpen={isDeleteGroupConfirmOpen}
        onClose={handleConfirmDeleteGroupClose}
        groupId={groupId}
        groupName={groupName}
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
                {(groupObject.should_show_members_account_balance && (storedUser.email !== member.member.email)) &&  (
                  <RemoveMemberButton
                    variant="contained"
                    color="error"
                    onClick={() => handleConfirmOpen(member.member)}
                    key={member.id}
                    startIcon={<DeleteIcon />}
                  >
                    Remove member
                  </RemoveMemberButton>
                )}
                {(groupObject.members.length === 1) &&  (
                  <RemoveMemberButton

                    variant="contained"
                    color="error"
                    onClick={handleConfirmDeleteGroupOpen}
                    key={member.id}
                    startIcon={<DeleteIcon />}
                  >
                    Delete group
                  </RemoveMemberButton>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
