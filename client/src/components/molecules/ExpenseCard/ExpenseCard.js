import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardHeader from "@mui/material/CardHeader";
function ExpenseCard({ expenseDetail, enxpenseDate }) {
  const expense_date = new Date(enxpenseDate);
  const formattedDate = `${expense_date.getDate()} ${expense_date.toLocaleString(
    "default",
    { month: "long" }
  )} ${expense_date.getFullYear()}`;

  const handleDeleteClick = () => {
    console.log("Delete icon clicked");
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 3,
        boxShadow: "6px 6px 6px 6px rgba(13, 71, 161, 0.5)",
        backdropFilter: "blur(5px)",
        background:
          "linear-gradient(to right top, rgba(200, 200, 200, 0.15), rgba(200, 200, 200, 0.15))",
      }}
    >
      <CardHeader
        title={expenseDetail.name}
        action={<DeleteForeverIcon onClick={handleDeleteClick} />}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography>Group: {expenseDetail.group_name}</Typography>
        <Typography>Category Name: {expenseDetail.category_name}</Typography>
        <div key={expenseDetail.expenseId}></div>

        <Typography style={{ marginTop: "10px" }}>
          Amount: {expenseDetail.amount} zł
        </Typography>
      </CardContent>
      {/* Add other card components or actions as needed */}
    </Card>
  );
}

export default ExpenseCard;
