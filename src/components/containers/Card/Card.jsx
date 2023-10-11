import ToggleSwitch from "../../inputs/Switch/ToggleSwitch";
import "./style.css";

export default function Card(props) {
  const { children, size, type, label, icon, active } = props;
  return (
    <div className={`card-${size}-dark`}>
      {children}
      {type === "toggle" && (
        <div>
          <div className="device-card-dark">
            <span
              style={{ fontSize: "3.5vw" }}
              className={
                active
                  ? "material-icons  icon-active "
                  : "material-icons-outlined icon-inactive"
              }
            >
              {icon}
            </span>
            <h4 className="label-card">{label}</h4>
          </div>

          <div className="button-card">
            <span>
              <ToggleSwitch checked={active} onChage={{}}/>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
