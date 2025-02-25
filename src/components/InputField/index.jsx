import React, { useEffect, useState } from "react";
import "../../css/InputField.css";

const InputField = React.forwardRef(
  ({ title, focus = false, type = "text", style = {}, ...otherProps }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      if (focus && ref?.current) {
        ref.current.focus();
      }
    }, [focus, ref]);

    return (
      <div className={`input-container ${isFocused || hasValue ? "focused" : ""}`}>
        {title && <label className="input-label">{title}</label>}
        <input
          className="input-field"
          type={type}
          ref={ref}
          style={style}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          {...otherProps}
        />
      </div>
    );
  }
);

export default InputField;
