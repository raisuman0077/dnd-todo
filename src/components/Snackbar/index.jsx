import React, { useEffect, useState } from "react";
import "../../css/Snackbar.css";
import { useDispatch, useSelector } from "react-redux";

const Snackbar = () => {
  const dispatch = useDispatch();
  const { type = "", message = "" } = useSelector((state) => state.snackbar);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!message && !type) return; // Don't start a timeout if there's no message

    const timer = setTimeout(() => {
      closeSnackbar();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, type]);

  const closeSnackbar = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch({ type: "RESET_SNACKBAR" });
      setIsClosing(false);
    }, 300);
  };

  if (!message && !type) return null;

  return (
    <div className={`snackbar ${type} ${isClosing ? "hide" : ""}`}>
      {message}
      <button className="close-btn" onClick={closeSnackbar}>
        ✖
      </button>
    </div>
  );
};

export default Snackbar;
