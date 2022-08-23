
import React from "react";
import SideBar from "./components/common/sidebar/SideBar";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Cafe from "./pages/cafe/Cafe";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<Cafe />} />
        <Route path="/cafe" element={<Cafe />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
