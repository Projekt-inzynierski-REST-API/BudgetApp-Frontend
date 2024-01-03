import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";

function ExpenseCard({ expenseDetail, enxpenseDate }) {
  const [reload, setReload] = useState(false);

  const expense_date = new Date(enxpenseDate);
  const formattedDate = `${expense_date.getDate()} ${expense_date.toLocaleString(
    "default",
    { month: "long" }
  )} ${expense_date.getFullYear()}`;

  const navigate = useNavigate();

  const handleUnauthorized = () => {
    alert("Twoja sesja wygasła, zaloguj się ponownie.");
    navigate("/");
  };

  const credential = localStorage.getItem("token");

  const handleDeleteClick = async () => {
    console.log("Czemu sie usuwa");

    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:1900/api/expense/${expenseDetail.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Access-Token": `${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
          handleUnauthorized();
        }
        setReload(true);
        return;
      }

      const data = (await response).json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {}, [reload]);
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
    </Card>
  );
}

export default ExpenseCard;
