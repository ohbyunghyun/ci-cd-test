import React, { useState } from "react";

function SettingInput(props) {
  const { title, placeholder, type, value, setValue, check, comment } = props;
  const [stateCondition, setStateCondition] = useState(true);
  function checkCondition(value) {
    if (check !== undefined) {
      setStateCondition(check(value));
      return stateCondition;
    }
    return false;
  }

  return (
    <div>
      <label className="form-label setting-label">{title}</label>
      <div style={{ display: "flex", marginBottom: "15px" }}>
        <input
          placeholder={placeholder ? placeholder : ""}
          value={value ? value : ""}
          type={type}
          onChange={(e) => {
            const newValue = e.target.value.trim();
            setValue(newValue);
            checkCondition(newValue);
          }}
          style={{
            width: "50%",
            backgroundColor: `var(--aim-base-tone)`,
            border: `1px solid var(--aim-border)`,
            borderRadius: "0.375rem",
            padding: "0.375rem 0.75rem",
            color: `var(--aim-text-default)`,
            fontSize: "1rem",
            fontWeight: "400",
          }}
        />
        <div style={{ alignSelf: "flex-end", marginLeft: "10px" }}>
          {" "}
          {stateCondition ? "" : comment ? comment : ""}
        </div>
      </div>
    </div>
  );
}

export default SettingInput;
