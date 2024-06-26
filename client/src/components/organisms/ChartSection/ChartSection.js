import React, { useEffect, useState } from "react";
import { StyledChartSection } from "./ChartSection.style";
import { ResponsivePie } from "@nivo/pie";

function ChartSection({ chartData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultChartData = [
    { id: "NoData", label: "No data", value: 100 },
  ];

  const pieChartData =
    chartData && chartData.data && chartData.data.length > 0
      ? chartData.data.map((item) => ({
          id: chartData.legend.items.find(
            (legendItem) => legendItem.id === item.category.id
          ).value,
          label: `${
            chartData.legend.items.find(
              (legendItem) => legendItem.id === item.category.id
            ).value
          }  - ${item.category.value} zł`,
          value: `${item.percentage.toFixed(2)}`,
        }))
      : defaultChartData;

  return (
    <StyledChartSection>
      <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80 }}
        innerRadius={0.5}
        padAngle={0.9}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="black"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        arcLabelsRadiusOffset={0.6}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        animatePresence={true}
        legends={[
          {
            anchor: window.innerWidth < 1200 ? "right" : "right",
            direction: "column",
            justify: false,
            translateX: window.innerWidth < 1200 ? 50 : 10,
            translateY: window.innerWidth < 1200 ? 0 : 0,
            itemsSpacing: 8,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "black",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "black",
                },
              },
            ],
            itemLabels: window.innerWidth < 1200 ? false : true,
          },
        ]}
      />
    </StyledChartSection>
  );
}

export default ChartSection;
