import ToggleSwitch from "../../inputs/Switch/ToggleSwitch";
import "./style.css";

export default function card(props) {
  const { children, size, type, label, icon } = props;
  return (
    <div className={`card-${size}-dark`}>
      {children}
      {type === "toggle" && (
        <div>
          <div className="device-card">
            <span className="icon-card">{icon}</span>
            <h4 className="label-card">{label}</h4>
          </div>

          <div className="button-card">
            <span>
              <ToggleSwitch />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
