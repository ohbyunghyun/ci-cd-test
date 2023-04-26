import React from "react";

function SettingRadio(props) {
  const { title, options, value, setValue } = props;

  return (
    <div>
      <label className="setting-label">{title}</label>
      <div style={{ display: "flex", marginBottom: "15px" }}>
        {options.map((option, index) => {
          return (
            <label key={index} style={{ margin: "10px", fontSize: "1rem" }}>
              <input
                type="radio"
                name="option"
                value={index}
                checked={value === index}
                onChange={() => setValue(index)}
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default SettingRadio;
