import React from "react";
import ExpenseCard from "../../molecules/ExpenseCard/ExpenseCard";
import { Wrapper } from "./ExpensesSection.style";
import { margin } from "@mui/system";

function ExpensesSection({ expenses }) {
  return (
    <Wrapper>
      {Array.isArray(expenses) && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <ExpenseCard
            key={expense.id}
            expenseDetail={expense}
            enxpenseDate={expense.date}
          ></ExpenseCard>
        ))
      ) : (
        <p
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          No expenses to display.
        </p>
      )}
    </Wrapper>
  );
}

export default ExpensesSection;
