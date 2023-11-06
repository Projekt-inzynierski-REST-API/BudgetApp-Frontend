import React from "react";
import { StyledChartSection } from "./ChartSection.style";
import Chart from "../../molecules/Chart/Chart";

function ChartSection({ data, options }) {
  return (
    <StyledChartSection>
      <Chart data={data} options={options}></Chart>
    </StyledChartSection>
  );
}

export default ChartSection;
