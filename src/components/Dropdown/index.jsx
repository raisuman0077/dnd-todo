import React, { useState } from "react";
import "../../css/Dropdown.css";

const index = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an Option");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option.title);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        {selected} ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="dropdown-item"
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default index;
