
import React from "react";
import SideBar from "./components/common/sidebar/SideBar";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import CafePage from "./pages/cafe/CafePage";
import CafeInfoPage from "./pages/cafe/CafeInfoPage"
import "./App.css";
import ThemePage from "./pages/theme/ThemePage";

function App() {

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<CafePage />} />
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/cafes/info" element={<CafeInfoPage />} />
        <Route path="/themes" element={<ThemePage />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
