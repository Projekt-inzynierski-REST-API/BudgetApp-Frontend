import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ data, options }) {
  return <Doughnut data={data} options={options} style={{ padding: 0 }} />;
}

export default Chart;
