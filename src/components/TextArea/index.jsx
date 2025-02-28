import React from "react";
import "../../css/TextArea.css";

const index = React.forwardRef(({ title, style = {}, ...otherProps }, ref) => {
  return (
    <div className="textArea-container">
      {title && <label className="textArea-label">{title}</label>}
      <textarea className="text-area" ref={ref} {...otherProps} style={{ ...style }} />
    </div>
  );
});

export default index;
