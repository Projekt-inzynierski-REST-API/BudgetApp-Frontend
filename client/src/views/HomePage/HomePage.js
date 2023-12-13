import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/organisms/NavigationBar/NavigationBar";
import Groups from "../../components/organisms/Groups/Groups";
import LastTransactionSection from "../../components/organisms/RightSectionContent/LastTransactionSection";
import ChartSection from "../../components/organisms/ChartSection/ChartSection";
import { useLocation } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ExpenseSection from "../../components/organisms/ExpenseSection/ExpenseSection";
import { SimpleBackdrop } from "../../components/molecules/SimpleBackdrop/SimpleBackdrop";

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
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [chartData, setChartData] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("SEVEN_DAYS");
  const [tokenClient, setTokenClient] = useState({});

  async function fetchLastTransaction() {
    try {
      const response = await fetch(
        "http://localhost:8081/api/dashboard/last-transactions",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + credential,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.status === 200) {
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
      const response = await fetch(
        "http://localhost:8081/api/dashboard/groups",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + credential,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();

      if (data.length === 0) {
        console.log("Brak rekordów.");
      } else {
        setGroups(data);
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

  const getAccessToken = () => {
    tokenClient.requestAccessToken();
  };

  useEffect(() => {
    fetchData("SEVEN_DAYS");
    fetchLastTransaction();
    fetchGroups();
  }, [credential]);

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.oauth2.initTokenClient({
  //     client_id:
  //       "627005936862-g942r7eqn2505l8f0nirkfl8lgb8ls8f.apps.googleusercontent.com",
  //     scope: "https://www.googleapis.com/auth/calendar",
  //     callback: (tokenResponse) => {
  //       console.log("google calendar token");
  //       console.log(tokenResponse);
  //       setTokenClient(tokenClient);
  //       // zapisanie access_tokenu w local storage
  //       localStorage.setItem("access_token", tokenResponse.access_token);
  //     },
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "large",
  //     size: "medium",
  //     width: "200px",
  //     height: "50px",
  //     longtitle: true,
  //     textColor: "#ffffff",
  //   });

  //   google.accounts.oauth2.prompt();
  // }, []);

  if (!chartData || !chartData.data) {
    return <SimpleBackdrop isOpen={true} />;
  }

  console.log("home page!");

  return (
    <>
      {/* <div id="signInDiv" onClick={getAccessToken}></div> */}
      <NavigationBar storedUser={storedUser}></NavigationBar>
      <h2 style={{ marginLeft: 30 }}>Overall </h2>
      <StyledPage>
        <LeftSection>
          <LeftSectionLeftPanel>
            <ChartSection chartData={chartData} />
          </LeftSectionLeftPanel>

          <LeftSectionRightPanel>
            <StyledSelectionBar>
              <ButtonGroup size="large">
                <Button
                  onClick={() => {
                    fetchData("SEVEN_DAYS");
                    setSelectedPeriod("SEVEN_DAYS");
                  }}
                  variant={
                    selectedPeriod === "SEVEN_DAYS" ? "contained" : "outlined"
                  }
                >
                  7 Days
                </Button>
                <Button
                  onClick={() => {
                    fetchData("ONE_MONTH");
                    setSelectedPeriod("ONE_MONTH");
                  }}
                  variant={
                    selectedPeriod === "ONE_MONTH" ? "contained" : "outlined"
                  }
                >
                  1 Month
                </Button>
                <Button
                  onClick={() => {
                    fetchData("THREE_MONTHS");
                    setSelectedPeriod("THREE_MONTHS");
                  }}
                  variant={
                    selectedPeriod === "THREE_MONTHS" ? "contained" : "outlined"
                  }
                >
                  3 Months
                </Button>
              </ButtonGroup>
            </StyledSelectionBar>

            <ExpenseSection totalExpense={chartData.total_expense} />
            {/* 
            <SavingsTips /> */}
          </LeftSectionRightPanel>
        </LeftSection>

        <RightSection>
          <LastTransactionSection
            key={lastTransactions}
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
