import React, { useState } from "react";
import "../../css/Navbar.css";
import { navSetupArray } from "./setup";
import { Link, useLocation } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { MdClose } from "react-icons/md";

const index = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const currentPath = location.pathname ? location.pathname : "/all";

  return (
    <div className="navbar">
      {/* Desktop Navbar */}
      <div className="desktop-navbar">
        <h2>Menu</h2>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: "8px",
            marginBottom: "6px",
          }}
        >
          Task
        </div>
        <div style={{ display: "grid", gap: "4px", marginTop: 4 }}>
          {navSetupArray.map((nav) => (
            <div
              key={nav.path}
              className={`btn ${currentPath === nav.path && "activeBtn"}`}
            >
              <Link to={nav.path} style={{ paddingLeft: "6px", fontSize: "20px" }}>
                {nav.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile nabar */}
      <div className="mobile-navbar">
        <div className="icon-section">
          <ImMenu
            className={`menu-icon ${open ? "hidden-icon" : "visible-icon"}`}
            onClick={() => setOpen(true)}
          />
          <label style={{ fontSize: "24px", fontWeight: "bold" }}>To-Do List</label>
        </div>
        <div
          className={`menu-dropdown ${open ? "show" : "hide"}`}
          onClick={() => setOpen(false)}
        >
          <MdClose
            className={`menu-icon close-icon ${open ? "visible-icon" : "hidden-icon"}`}
            onClick={() => setOpen(false)}
            style={{ fontSize: "36px" }}
          />
          {navSetupArray.map((nav) => (
            <div
              key={nav.path}
              className={`menu-list btn ${
                currentPath === nav.path && "activeBtn-mobile"
              }`}
            >
              <Link to={nav.path} style={{ paddingLeft: "6px" }}>
                {nav.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
