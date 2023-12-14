import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import ExpensesSection from "../../components/organisms/Expenses/ExpensesSection";
import { Wrapper } from "./Expenses.style";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function Expenses() {
  const [expenses, setExpenses] = useState([   
        {
          expenseId: 1,
          expenseName: "Zakupy spozywcze",
          amount: 100.0,
          expenseDate: "hds",
          groupName: "Jakaś grupa testowa",
        },
        {
          expenseId: 2,
          expenseName: "Kupno laptopa",
          amount: 3140.0,
          expenseDate: "hds",
          groupName: "Jakaś grupa testowa",
        },
        {
          expenseId: 3,
          expenseName: "Karnet na siłke",
          amount: 120.0,
          expenseDate: "hds",
          groupName: "Jakaś grupa testowa",
        },
        {
          expenseId: 4,
          expenseName: "Kupno słuchawek",
          amount: 250.0,
          expenseDate: "hds",
          groupName: "Jakaś grupa testowa",
        },
  ]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleAddExpenseClick = () => {
    // Kliknięcie przycisku spowoduje nawigację do '/ExpenseCreator'
    navigate("/ExpenseCreator");
  };

  const fetchExpenses = async () => {
    // try {
    //   const response = await fetch("http://localhost:1900/expenses");
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch expenses");
    //   }
    //   const expensesData = await response.json();
    //   setExpenses(expensesData);
    // } catch (error) {
    //   console.error("Error fetching expenses:", error.message);
    // }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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
