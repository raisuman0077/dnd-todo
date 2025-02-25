import React from "react";
import "../../css/Button.css";
const index = React.forwardRef(({ children, style = {}, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="default-btn"
      onClick={() => onClick()}
      style={{ ...style }}
      {...props}
    >
      {children}
    </button>
  );
});

export default index;
