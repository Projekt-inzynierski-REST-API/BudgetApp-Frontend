import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import LastTransactionSection from "../../components/organisms/RightSectionContent/LastTransactionSection";
import ChartSection from "../../components/organisms/ChartSection/ChartSection";
import { useLocation } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import {
  StyledPage,
  RightSection,
  LeftSection,
  StyledSelectionBar,
  LeftSectionRightPanel,
  LeftSectionLeftPanel,
  ExpenseHistorySection,
} from "./StyledHomePage.style";

function HomePage() {
  const location = useLocation();
  const credential = location.state && location.state.credential;
  console.log("JWT Token from HomePage: " + credential);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [chartData, setChartData] = useState([]);

  async function fetchData(timePeriod) {
    try {
      console.log("poczatek fetch data");
      const response = await fetch("http://localhost:4000/db", {
        headers: {
          Authorization: credential,
          PeriodTime: timePeriod,
        },
      });

      const data = await response.json();

      if (data.length === 0) {
        console.log("Brak rekordów.");
      } else {
        setChartData(data);
      }
    } catch (error) {
      console.error("Error coo:", error);
    }
  }

  useEffect(() => {
    fetchData("7days");
    console.log("robi sie useeeffect");
  }, [credential]);

  if (!chartData || !chartData.data) {
    return <div style={{ marginTop: "11vh" }}>Loading...</div>;
  }

  let jsonString = JSON.stringify(chartData);
  console.log(jsonString);

  const chartLabels =
    chartData && chartData.data
      ? chartData.data.map((item) => {
          const legendItem = chartData.legend.items.find(
            (legend) => legend.id === item.category.id
          );
          return legendItem ? legendItem.value : "Unknown category";
        })
      : [];

  const chartDataValues =
    chartData && chartData.data
      ? chartData.data.map((item) => item.percentage)
      : [];
  const chartBackgroundColor =
    chartData && chartData.legend
      ? chartData.legend.items.map((item) => item.color)
      : [];
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartDataValues,
        backgroundColor: chartBackgroundColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",

        labels: {},
      },
    },
  };

  console.log("ejj data i options" + data);
  console.log(data);

  return (
    <>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <StyledPage>
        <LeftSection>
          <LeftSectionLeftPanel />
          <ChartSection data={data} options={options} />
          <LeftSectionRightPanel>
            <StyledSelectionBar>
              <ButtonGroup size="large" aria-label="large button group">
                <Button onClick={() => fetchData("7days")}>7 Days</Button>
                <Button onClick={() => fetchData("2months")}>Two Months</Button>
                <Button onClick={() => fetchData("3months")}>
                  Three Months
                </Button>
              </ButtonGroup>
            </StyledSelectionBar>
            <ExpenseHistorySection>
              <p>sdvasghdhsa</p>
              <p>sdvasghdhsa</p>
              <p>sdvasghdhsa</p>
              <p>sdvasghdhsa</p>
              <p>sdvasghdhsa</p>
            </ExpenseHistorySection>
          </LeftSectionRightPanel>
        </LeftSection>

        <RightSection>
          <LastTransactionSection></LastTransactionSection>
        </RightSection>
      </StyledPage>
    </>
  );
}

export default HomePage;
