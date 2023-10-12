import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function ToggleSwitch({
  active,
  onChange,
  id,
  disabled,
  customClass,
}) {
  const [isActive, setIsActive] = useState(active);

  const handleChange = () => {
    if (!disabled) {
      setIsActive(!isActive);
      if (onChange) {
        onChange(!isActive,id);
      }
    }
  };

  return (
    <div className={`toggle-switch ${customClass || ""}`}>
      <label className={`switch ${disabled ? "disabled" : ""}`}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

ToggleSwitch.propTypes = {
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  customClass: PropTypes.string,
};
