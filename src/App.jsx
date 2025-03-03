import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import Home from "../src/views/Home";
import TodayList from "../src/views/TodayList";
import Scheduled from "./views/Scheduled";
import Unscheduled from "./views/Unscheduled";
import Snackbar from "../src/components/Snackbar";
import TopNavbar from "../src/components/TopNavbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/all", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div
      style={{
        maxHeight: "100dvh",
        width: "100dvw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Snackbar />
      <Navbar />
      <div className="main-display">
        <TopNavbar />
        <Routes>
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
