import Card from "../../containers/Card/Card";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./style.css";

export default function LineChartInputReader({
  data,
  title,
  lineColor,
  labels,
  icon,
  unit,
  inputId,
}) {
  const chartRef = useRef();

  useEffect(() => {
    if (data && inputId) {
      const inputData = data.map((item) =>
        item.find((obj) => obj.id === inputId)
      );

      const values = inputData.map((item) => (item ? item.value : null));

      const ctx = chartRef.current.getContext("2d");

      const lineChart = new Chart(ctx, {
        type: "line",

        data: {
          labels: labels,

          datasets: [
            {
              data: values,
              fill: true,
              borderColor: lineColor, //"rgba(29, 185, 255, 1)",
              backgroundColor: `rgba(${lineColor.slice(5, -1)}, 0.05)`, //"rgba(29, 185, 255, 0.05)",
              tension: 0.4,
              pointStyle: false,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },

          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: unit,
                font: {
                  family: "Poppins",
                  size: "17px",
                  weight: "400",
                },
                color: lineColor,

                padding: { top: 20, left: 0, right: 0, bottom: 0 },
              },
              ticks: {
                callback: function (val, index) {
                  return index % 2 === 0 ? this.getLabelForValue(val) : "";
                },
                color: "rgb(104, 116, 125)",
              },

              grid: {
                color: "rgba(27, 24, 27, 0.3)",
              },
            },
            x: {
              ticks: {
                callback: function (val, index) {
                  return index % 2 === 0 ? this.getLabelForValue(val) : "";
                },
                color: "rgb(104, 116, 125)",
              },
              grid: {
                color: "rgba(27, 24, 27, 0.3)",
              },
            },
          },
          animation: {
            duration: 0,
          },
        },
      });

      return () => {
        lineChart.destroy();
      };
    }
  }, [data, inputId]);

  return (
    <Card size={"lg"} style={{ padding: "5.5vw" }}>
      <div className="LineChartInputReader-title-container">
        <span
          style={{ fontSize: "1.5vw" }}
          className={"material-icons-outlined LineChartInputReader-icon"}
        >
          {icon}
        </span>
        <h4 className="LineChartInputReader-title-label">{title}</h4>
      </div>
      <div className="canvas-container">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
}
