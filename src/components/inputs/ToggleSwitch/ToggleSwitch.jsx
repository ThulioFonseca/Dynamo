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

  const handleChange = () => {
    if (!disabled) {
      if (onChange) {
        onChange(!active);
      }
    }
  };

  return (
    <div className={"toggle-switch"}>
      <label className={`switch ${disabled ? "disabled" : ""}`}>
        <input
          type="checkbox"
          checked={active}
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
