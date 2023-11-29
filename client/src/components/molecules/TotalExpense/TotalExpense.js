import React from "react";
import { StyledTotalExpense } from "./TotalExpense.style";
import WalletIcon from "../../../assets/icons/WALLET.png";

function TotalExpense() {
  return (
    <StyledTotalExpense>
      <img
        src={WalletIcon}
        alt="Wallet icon"
        width={24}
        style={{ marginRight: "5px" }}
      ></img>
      <b>Total expense:</b>
    </StyledTotalExpense>
  );
}

export default TotalExpense;
