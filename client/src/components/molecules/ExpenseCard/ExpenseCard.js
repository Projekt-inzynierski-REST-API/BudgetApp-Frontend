import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export default function ExpenseCard({ expenseDetail, enxpenseDate }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const credential = localStorage.getItem("token");
  const expense_date = new Date(enxpenseDate);
  const formattedDate = `${expense_date.getDate()} ${expense_date.toLocaleString(
    "default",
    { month: "long" }
  )} ${expense_date.getFullYear()}`;

  const handleUnauthorized = () => {
    alert("Twoja sesja wygasła, zaloguj się ponownie.");
    navigate("/");
  };

  const handleDeleteClick = async () => {
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
      } else {
        navigate("/Expenses");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (!storedUser) {
      alert("Musisz się pierwsze zalogować!");
      navigate("/");
    }
  }, [storedUser]);

  return (
    <Card
      sx={{
        maxWidth: 220,
        margin: 3,
        boxShadow: "6px 6px 6px 6px rgba(13, 71, 161, 0.5)",
        backdropFilter: "blur(5px)",
        background:
          "linear-gradient(to right top, rgba(200, 200, 200, 0.15), rgba(200, 200, 200, 0.15))",
      }}
    >
      <CardHeader
        title={expenseDetail.name}
        action={
          <Tooltip title="Remove expense">
            <DeleteForeverIcon
              style={{
                cursor: "pointer",
              }}
              onClick={handleDeleteClick}
            />
          </Tooltip>
        }
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {formattedDate}
        </Typography>

        <Typography>Category: {expenseDetail.category_name}</Typography>
        <div key={expenseDetail.expenseId}></div>

        <Typography style={{ marginTop: "10px" }}>
          Amount: {expenseDetail.amount} zł
        </Typography>
      </CardContent>
    </Card>
  );
}
