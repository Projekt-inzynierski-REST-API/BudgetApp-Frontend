import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import Groups from "../../components/organisms/Groups/Groups";
import LastTransactionSection from "../../components/organisms/RightSectionContent/LastTransactionSection";
import ChartSection from "../../components/organisms/ChartSection/ChartSection";
import { useLocation } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ExpenseSection from "../../components/organisms/ExpenseSection/ExpenseSection";
import SavingsTips from "../../components/organisms/SavingTips/SavingTips";

import {
  StyledPage,
  RightSection,
  LeftSection,
  StyledSelectionBar,
  LeftSectionRightPanel,
  LeftSectionLeftPanel,
  GroupsSection,
} from "./StyledHomePage.style";

function HomePage() {
  const location = useLocation();
  const credential = location.state && location.state.credential;
  // console.log("JWT Token from HomePage: " + credential);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [chartData, setChartData] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);

  async function fetchLastTransaction() {
    try {
      const response = await fetch(
        "http://localhost:8081/api/dashboard/last-transactions",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + credential,
          },
        }
      );

      if (response.status == 200) {
        const data = await response.json();
        setLastTransactions(data);
      } else {
        console.log("Brak rekordów");
      }
    } catch (error) {
      console.error("Error coo:", error);
    }
  }

  async function fetchGroups() {
    try {
      const response = await fetch("http://localhost:4000/db", {
        method: "GET",
      });

      if (response.status == 200) {
        const data = await response.json();
        setGroups(data);
      } else {
        console.log("Brak rekordów");
      }
    } catch (error) {
      console.error("Error coo:", error);
    }
  }

  async function fetchData(timePeriod) {
    try {
      const response = await fetch(
        "http://localhost:8081/api/dashboard/chart",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + credential,
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            period: timePeriod,
          }),
        }
      );

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

  const sumTotalExpense = (data) => {
    if (data && data.data) {
      const total = data.data.reduce(
        (acc, item) => acc + item.category.value,
        0
      );
      setTotalExpense(total);
    }
  };

  useEffect(() => {
    fetchData("ONE_MONTH");
    fetchLastTransaction();
    fetchGroups();
  }, [credential]);

  useEffect(() => {
    sumTotalExpense(chartData);
    console.log("Total Expense:", totalExpense);
  }, [chartData]);

  if (!chartData || !chartData.data) {
    return <div style={{ marginTop: "11vh" }}>Loading...</div>;
  }

  console.log(groups);

  return (
    <>
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <h2 style={{ marginLeft: 30 }}>Overall </h2>
      <StyledPage>
        <LeftSection>
          <LeftSectionLeftPanel>
            <ChartSection chartData={chartData} />
          </LeftSectionLeftPanel>

          <LeftSectionRightPanel>
            <StyledSelectionBar>
              <ButtonGroup size="medium">
                <Button onClick={() => fetchData("SEVEN_DAYS")}>7 Days</Button>
                <Button onClick={() => fetchData("ONE_MONTH")}>1 Month</Button>
                <Button onClick={() => fetchData("THREE_MONTHS")}>
                  3 Months
                </Button>
              </ButtonGroup>
            </StyledSelectionBar>
            <ExpenseSection totalExpense={totalExpense} />

            <SavingsTips />
          </LeftSectionRightPanel>
        </LeftSection>

        <RightSection>
          <LastTransactionSection
            LastTransactionSectionData={lastTransactions}
          ></LastTransactionSection>
        </RightSection>
      </StyledPage>
      <GroupsSection>
        <h2 style={{ marginLeft: 30 }}>User Groups</h2>
        <Groups groups={groups} />
      </GroupsSection>
    </>
  );
}

export default HomePage;
