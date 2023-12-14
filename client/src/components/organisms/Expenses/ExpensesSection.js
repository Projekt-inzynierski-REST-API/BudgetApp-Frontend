import React, { useState } from "react";
import ExpenseCard from "../../molecules/ExpenseCard/ExpenseCard";
import { Wrapper } from "./ExpensesSection.style";

function ExpensesSection({ expenses }) {
  return (
    <Wrapper>
      {Array.isArray(expenses) && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <ExpenseCard key={expense.expenseId} expenseDetail={expense} />
        ))
      ) : (
        <p>No data for Expenses</p>
      )}
    </Wrapper>
  );
}

export default ExpensesSection;
