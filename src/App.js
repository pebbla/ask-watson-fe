
import React from "react";
import SideBar from "./components/common/sidebar/SideBar";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import CafePage from "./pages/cafe/CafePage";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<CafePage />} />
        <Route path="/cafe" element={<CafePage />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
