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

  if (!chartData || !chartData.data || !chartData.legend || !chartData.type) {
    return <div>No data available for the chart.</div>;
  }
  const pieChartData = chartData
    ? chartData.data.map((item) => ({
        id: chartData.legend.items.find(
          (legendItem) => legendItem.id === item.category.id
        ).value,
        label: `${
          chartData.legend.items.find(
            (legendItem) => legendItem.id === item.category.id
          ).value
        }  - ${item.category.value} zł`,
        value: `${item.percentage.toFixed(2)} `,
      }))
    : [];

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
          modifiers: [["darker", 1.6]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        animatePresence={true}
        legends={[
          {
            anchor: window.innerWidth < 1200 ? "right" : "right",
            direction: "column",
            justify: false,
            translateX: window.innerWidth < 1200 ? 50 : 20,
            translateY: window.innerWidth < 1200 ? -60 : 0,
            itemsSpacing: 8,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
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
