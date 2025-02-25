import React from "react";
import "../../css/Modal.css";
const index = ({ children, isOpen, onClose, title = "", Button = null }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="content">{children}</div>
        {Button && (
          <div className="btn-div">
            <Button />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
