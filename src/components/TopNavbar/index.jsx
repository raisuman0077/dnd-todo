import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../css/TopNavbar.css";

import Button from "../Button";
import AddTask from "../AddTask";

const index = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const page = location.pathname.split("/")[1];

  return (
    <>
      {open && (
        <AddTask
          open={open}
          setOpen={() => {
            setOpen(false);
          }}
        />
      )}

      <div className="top-navbar">
        <h1 style={{ textTransform: "capitalize" }}>{page}</h1>
        <Button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "transparent",
            width: "210px",
            color: "#747474",
            border: "2px solid #656363",
            marginTop: "8px",
            height: "auto",
            color: "#000000",
          }}
        >
          + Add New TODO
        </Button>
      </div>
    </>
  );
};

export default index;
