import "./style.css";

export default function ToggleSwitch() {
  return (
    <label class="switch">
      <input type="checkbox" />
      <span class="slider"></span>
    </label>
  );
}
