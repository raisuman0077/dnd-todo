import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import Home from "../src/views/Home";
import TodayList from "../src/views/TodayList";
import Upcoming from "../src/views/Upcoming";
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
        width: "100dvw",
        maxHeight: "100dvh",
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
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
