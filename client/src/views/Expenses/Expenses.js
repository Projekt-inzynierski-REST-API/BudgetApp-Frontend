import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import ExpensesSection from "../../components/organisms/Expenses/ExpensesSection";
import { Wrapper } from "./Expenses.style";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleAddExpenseClick = () => {
    // Kliknięcie przycisku spowoduje nawigację do '/add-expense'
    console.log("nawigacja i jazdaa");
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:1900/expenses");
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const expensesData = await response.json();
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
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
          You have spent 0 zł <br /> In a total of expenses!{" "}
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
