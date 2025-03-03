import React, { useEffect, useState } from "react";
import "../../css/Modal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ children, isOpen, onClose, title = "", Button = null }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <IoMdCloseCircleOutline className="close-button" onClick={onClose} />
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

export default Modal;
