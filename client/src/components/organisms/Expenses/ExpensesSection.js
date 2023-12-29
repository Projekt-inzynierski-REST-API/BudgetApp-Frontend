import React, { useState } from "react";
import ExpenseCard from "../../molecules/ExpenseCard/ExpenseCard";
import { Wrapper } from "./ExpensesSection.style";
import { SimpleBackdrop } from "../../molecules/SimpleBackdrop/SimpleBackdrop";

function ExpensesSection({ expenses }) {
  return (
    <Wrapper>
      {Array.isArray(expenses) && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <ExpenseCard
            key={expense.id}
            expenseDetail={expense}
            enxpenseDate={expense.date}
          />
        ))
      ) : (
        <SimpleBackdrop isOpen={true} />
      )}
    </Wrapper>
  );
}

export default ExpensesSection;
