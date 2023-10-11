import "./style.css";

export default function ToggleSwitch(props) {
  const {active} = props
  return (
    <label class="switch">
      <input type="checkbox" checked={active} />
      <span class="slider"></span>
    </label>
  );
}
