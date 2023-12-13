import React from "react";
import { StyledLastTransactionSection } from "./LastTransactionSection.style";
import JEDZENIE from "../../../assets/icons/JEDZENIE.png";
import TRANSPORT from "../../../assets/icons/TRANSPORT.png";
import RACHUNKI from "../../../assets/icons/RACHUNKI.png";
import DOM from "../../../assets/icons/DOM.png";
import INNE from "../../../assets/icons/INNE.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

function LastTransactionSection({ LastTransactionSectionData }) {
  return (
    <>
      <StyledLastTransactionSection>
        <h2>Last 5 transactions:</h2>
        <List>
          {LastTransactionSectionData &&
          LastTransactionSectionData.transactions ? (
            LastTransactionSectionData.transactions.map((transaction) => {
              const transactionDate = new Date(transaction.date);
              const formattedDate = `${transactionDate.getDate()} ${transactionDate.toLocaleString(
                "default",
                { month: "long" }
              )} ${transactionDate.getFullYear()}`;

              let icon;
              switch (transaction.category_name) {
                case "JEDZENIE":
                  icon = JEDZENIE;
                  break;
                case "TRANSPORT":
                  icon = TRANSPORT;
                  break;
                case "RACHUNKI":
                  icon = RACHUNKI;
                  break;
                case "DOM":
                  icon = DOM;
                  break;
                case "INNE":
                  icon = INNE;
                  break;
              }
              const uniqueKey = `${transaction.name}-${transaction.date}`;
              return (
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    // backgroundColor: "red",
                  }}
                  key={uniqueKey}
                >
                  <ListItem style={{ marginBottom: "1px", marginTop: "1px" }}>
                    <ListItemAvatar>
                      <img
                        src={icon}
                        key={transaction.transactionId}
                        alt={transaction.category_name}
                        width="30"
                        height="30"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={transaction.name}
                      secondary={formattedDate}
                      style={{ marginRight: "10px" }} // Dostosuj odstęp na lewo od drugiego elementu
                    />
                  </ListItem>

                  <ListItemText
                    primary={
                      <span
                        style={{
                          color: "#ff3d00",
                          fontWeight: "bold",
                        }}
                      >
                        -{transaction.amount}zł
                      </span>
                    }
                  />
                </div>
              );
            })
          ) : (
            <li>No transactions available</li>
          )}
        </List>
      </StyledLastTransactionSection>
    </>
  );
}

export default LastTransactionSection;
