import Chart from "react-apexcharts";
import Card from "../../containers/Card/Card";
import "./style.css";

export default function GaugeChartReader({ size, value, unit }) {
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

  const series = [value];

  return (
    <Card size={size}>
      <div className="gcr-container">
      <div>

        <Chart
          options={options}
          series={series}
          type="radialBar"
          width={"400"}
        />
      </div>
        <div>
          <div className="gcr-value-container">
            <h1 className="gcr-value">{value !== null ? value : "--"}</h1>
            <h4 className="gcr-unit">{unit}</h4>
          </div>
        </div>
      </div>
    </Card>
  );
}
