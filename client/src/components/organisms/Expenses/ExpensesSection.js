import React from "react";
import ExpenseCard from "../../molecules/ExpenseCard/ExpenseCard";
import { Wrapper } from "./ExpensesSection.style";

function ExpensesSection({ expenses }) {
  return (
    <Wrapper>
      {console.log(expenses)}
      {Array.isArray(expenses) && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <ExpenseCard
            key={expense.id}
            expenseDetail={expense}
            enxpenseDate={expense.date}
          />
        ))
      ) : (
        <div>No data</div>
      )}
    </Wrapper>
  );
}

export default ExpensesSection;
