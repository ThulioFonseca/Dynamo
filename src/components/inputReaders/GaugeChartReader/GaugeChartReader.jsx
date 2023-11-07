import Chart from "react-apexcharts";
import Card from "../../containers/Card/Card";
import "./style.css";

export default function GaugeChartReader({ size, value, unit, label, icon, }) {
  const options = {
    chart: {
      id: "basic-radialBar",
      type: "radialBar",
      height: 280,
    },
    colors: ["rgba(29, 185, 255, 1)"],
    series: [55],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "rgb(76, 84, 92)",
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["rgba(163, 42, 255, 1)"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
  };

  const options2 = {
    chart: {
      id: "basic-radialBar",
      type: "radialBar",
      height: 280,
    },
    colors: ["rgba(163, 42, 255, 1)"],
    series: [55],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "rgb(76, 84, 92)",
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["rgba(29, 185, 255, 1) "],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
  };

  const series = [value > 100 ? 100 : value];

  return (
    <Card size={size}>
      <div className="gcr-container">
        <div className="chart">
          <Chart
            options={value < 50 ? options2 : options}
            series={series}
            type="radialBar"
            width={"130%"}
          />
        </div>
        <div className="value-chart">
          <div className="gcr-value-container">
            <h1 className="gcr-value">{value || "--"}</h1>
            <h4 className="gcr-unit">{unit || "N/A"}</h4>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <span
            style={{ fontSize: "1.2vw" }}
            className={"material-icons-outlined gcr-icon"}
          >
            {icon}
          </span>
          <h4 className="gcr-label">{label}</h4>
        </div>
      </div>
    </Card>
  );
}
