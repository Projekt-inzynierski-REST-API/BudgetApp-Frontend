import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import { useNavigate, useLocation } from "react-router-dom";
import ExpensesSection from "../../components/organisms/Expenses/ExpensesSection";
import {
  Wrapper,
  FirstHeader,
  AddExpenseButton,
  ExpensesWrapper,
  MainContainer,
  Content,
} from "./Expenses.style";
import Footer from "../../components/organisms/Footer/Footer";

function Expenses() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    alert("Twoja sesja wygasła, zaloguj się ponownie.");
    navigate("/");
  };

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
          handleUnauthorized();
          return;
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
  }, [location]);

  return (
    <MainContainer>
      <Content>
        <NavigationBar storedUser={storedUser}></NavigationBar>
        <Wrapper>
          <FirstHeader>
            You have spent {totalAmount} zł <br /> In a total of {totalExpenses}{" "}
            expenses!{" "}
          </FirstHeader>

          <AddExpenseButton
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleAddExpenseClick}
          >
            Add expense
          </AddExpenseButton>
        </Wrapper>
        <ExpensesWrapper>
          <ExpensesSection expenses={expenses} />
        </ExpensesWrapper>
      </Content>
      <Footer />
    </MainContainer>
  );
}

export default Expenses;
