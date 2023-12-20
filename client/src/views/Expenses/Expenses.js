import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import ExpensesSection from "../../components/organisms/Expenses/ExpensesSection";
import { Wrapper } from "./Expenses.style";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleAddExpenseClick = () => {
    navigate("/ExpenseCreator");
  };

  const fetchExpenses = async () => {
    try {
      const credential = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:1900/api/expense/getLast",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rows_number: 10,
          }),
        }
      );
      if (!response.status === 201) {
        if (response.status === 401) {
          console.error("Błąd uwierzytelnienia: Sprawdź poprawność tokena.");
        } else {
          console.error(`Błąd HTTP: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setExpenses(data.expenses);
      setTotalAmount(data.totalAmount);
      setTotalExpenses(data.totalExpenses);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <NavigationBar storedUser={storedUser} />
      <Wrapper>
        <h1>Expenses Tracker</h1>
        <h2>
          You have spent {totalAmount} zł <br /> In a total of {totalExpenses}{" "}
          expenses!{" "}
        </h2>
        <Fab color="primary" aria-label="add" onClick={handleAddExpenseClick}>
          <AddIcon />
        </Fab>
      </Wrapper>

      <ExpensesSection expenses={expenses} />
    </>
  );
}

export default Expenses;
