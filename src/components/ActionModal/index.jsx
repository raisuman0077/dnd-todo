import React, { useEffect, useState } from "react";
import "../../css/ActionModal.css";
const index = ({ position, close, handleClick }) => {
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    setModalStyle({
      top: position.y,
      left: position.x,
      position: "absolute",
    });
  }, [position]);

  return (
    <div className="action-container" onClick={close}>
      <div
        className="action-content"
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        <label className="action-label" onClick={() => handleClick("edit")}>
          Edit
        </label>
        <label className="action-label" onClick={() => handleClick("delete")}>
          Delete
        </label>
      </div>
    </div>
  );
};

export default index;
