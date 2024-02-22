import React from "react";
import "./style.css";

const InputComponnet = ({
  label = "",
  placeholder = "",
  value,
  onChangeText,
  error,
  style,
  ...rest
}) => {
  return (
    <div className="input-container" style={style}>
      {label && (
        <label htmlFor="" className="input-label">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChangeText}
        placeholder={placeholder}
        className="input-componnet"
        {...rest}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputComponnet;
