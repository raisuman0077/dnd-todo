import React, { useEffect, useRef, useState } from "react";
import "../../css/Dropdown.css";
import { IoIosArrowForward } from "react-icons/io";

const index = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (title === "canceled") return <>Canceled</>;
  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="status-ui"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <label className="dropdown-label">{title}</label>
        <IoIosArrowForward
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </div>
      <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        {options.map((item) => (
          <div
            key={item.value}
            className="dropdown-item"
            onClick={() => handleSelect(item.value)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
