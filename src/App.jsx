import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import Home from "../src/views/Home";
import TodayList from "../src/views/TodayList";
import Scheduled from "./views/Scheduled";
import Unscheduled from "./views/Unscheduled";
import Snackbar from "../src/components/Snackbar";
import TopNavbar from "../src/components/TopNavbar";

function App() {
  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
  return (
    <div className="app">
      <Snackbar />
      <Navbar />
      <div
        className="main-display"
        style={{ width: "100%", boxSizing: "border-box", padding: "24px" }}
      >
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/all" />} />
          <Route path="/all" element={<Home />} />
          <Route path="/today" element={<TodayList />} />
          <Route path="/scheduled" element={<Scheduled />} />
          <Route path="/unscheduled" element={<Unscheduled />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
