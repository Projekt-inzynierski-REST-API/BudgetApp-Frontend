import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function ExpenseCard({ expenseDetail }) {
  const cardStyle = {
    height: "200px", // Set the desired height
    background: "linear-gradient(to bottom, #3498db, #9b59b6)", // Gradient from blue to purple
    color: "white", // Text color, adjust as needed
    padding: "16px", // Adjust padding as needed
    marginBottom: "26px", // Add margin at the bottom
    position: "relative",
    width: "auto",
    maxWidth: "300px", // Set the desired maxWidth
  };

  const amountStyle = {
    fontSize: "20px", // Set the desired font size
    position: "absolute",
    bottom: "16px",
    right: "16px",
    color: "black", // Text color for amount
  };

  const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align text to the left
    justifyContent: "center",
    height: "100%", // Ensure content takes full height
    textAlign: "left", // Align text to the left
    fontFamily: "Arial, sans-serif", // Set desired font family
  };

  const expenseNameStyle = {
    marginTop: -60,
    fontSize: "24px", // Set the desired font size for the expense name
    color: "#ffcc00", // Set the desired color for the expense name
  };

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="h6" style={expenseNameStyle}>
          {expenseDetail.expenseName}
        </Typography>

        <div key={expenseDetail.expenseId}>
          <p style={{ color: "#cccccc" }}>{expenseDetail.expenseDate}</p>
          <p style={{ color: "#cccccc" }}>Group: {expenseDetail.groupName}</p>
        </div>

        <Typography style={{ ...amountStyle, marginTop: "10px" }}>
          Amount: {expenseDetail.amount} zł
        </Typography>
      </CardContent>
      {/* Add other card components or actions as needed */}
    </Card>
  );
}

export default ExpenseCard;
