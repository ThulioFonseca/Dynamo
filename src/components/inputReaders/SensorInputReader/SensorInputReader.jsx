import Card from "../../containers/Card/Card";
import "./style.css";

export default function SensorInputReader({
  id,
  label,
  unit,
  size,
  value,
  icon,
  alarmLow,
  alarmHigh,
}) {
  return (
    <Card size={size}>
      <div className="sir-container">
        <span
          style={{ fontSize: "1.5vw", fontWeight: "100" }}
          className={"material-icons-outlined sir-icon"}
        >
          {icon}
        </span>
        <div className="sir-value-container">
          <h1 className="sir-value">{value !== null ? value : "--"}</h1>
          <h4 className="sir-unit">{unit}</h4>
        </div>
        <h4 className="sir-label">{label}</h4>
      </div>
    </Card>
  );
}
