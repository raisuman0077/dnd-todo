import React, { useState } from "react";
import "../../css/Navbar.css";
import { navSetupArray } from "./setup";
import { Link, useLocation } from "react-router-dom";

const index = () => {
  const location = useLocation();
  const currentPath = location.pathname ? location.pathname : "/all";

  return (
    <div className="navbar">
      {/* Desktop Navbar */}
      <div className="desktop-navbar">
        <h2>Menu</h2>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Task</div>
        <div>
          {navSetupArray.map((nav) => (
            <div
              key={nav.path}
              className={`btn ${currentPath === nav.path && "activeBtn"}`}
            >
              <Link to={nav.path} style={{ paddingLeft: "6px" }}>
                {nav.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile nabar */}
      <div className="mobile-navbar">
        {navSetupArray.map((nav) => (
          <div
            key={nav.path}
            className={`btn ${currentPath === nav.path && "activeBtn"}`}
          >
            <Link to={nav.path} style={{ paddingLeft: "6px" }}>
              {nav.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
