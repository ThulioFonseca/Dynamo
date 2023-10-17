import "./style.css";
import Card from "../../containers/Card/Card";
import ToggleSwitch from "../../inputs/ToggleSwitch/ToggleSwitch";

export default function DigitalOutputController({
  active,
  type,
  label,
  id,
  icon,
  onChange,
}) {
  const handleSwitchChange = (newState) => {
    const messageObject = {
      type: "controlEvent",
      id: id,
      value: newState,
    };

    const serializedMessage = JSON.stringify(messageObject);

    if (newState) {
      onChange(serializedMessage);
    } else {
      onChange(serializedMessage);
    }
  };

  return (
    <Card size={"sm"}>
      {type === "toggle" && (
        <div>
          <div className="doc-device-icon-dark">
            <span
              style={{ fontSize: "3.5vw" }}
              className={
                active
                  ? "material-icons-outlined doc-icon-active "
                  : "material-icons-outlined doc-icon-inactive"
              }
            >
              {icon}
            </span>
            <h4 className="doc-label">{label}</h4>
          </div>

          <div className="doc-button">
            <span>
              <ToggleSwitch active={active} onChange={handleSwitchChange} />
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
