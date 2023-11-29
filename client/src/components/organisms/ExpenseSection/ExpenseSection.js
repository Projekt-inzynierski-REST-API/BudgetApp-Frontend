import React from "react";
import CountUp from "react-countup";
import TotalExpense from "../../molecules/TotalExpense/TotalExpense";

import { Wrapper, StyledExpenseValue } from "./ExpenseSection.style";

function ExpenseSection({ totalExpense }) {
  return (
    <Wrapper>
      <TotalExpense />
      <StyledExpenseValue>
        -
        <CountUp end={totalExpense} duration={2} />
        &nbsp;zł
      </StyledExpenseValue>
    </Wrapper>
  );
}

export default ExpenseSection;
