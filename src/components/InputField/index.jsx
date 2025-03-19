import React, { useEffect, useState } from "react";
import "../../css/InputField.css";

const InputField = React.forwardRef(
  ({ title, focus = false, type = "text", style = {}, ...otherProps }, ref) => {
    return (
      <div className={`input-container`}>
        {title && <label className="input-label">{title}</label>}
        <input
          className="input-field"
          type={type}
          ref={ref}
          style={style}
          {...otherProps}
        />
      </div>
    );
  }
);

export default InputField;
