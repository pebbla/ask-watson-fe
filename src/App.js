
import React from "react";
import SideBar from "./components/common/sidebar/SideBar.js";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import CafePage from "./pages/cafe/CafePage.js";
import CafeInfoPage from "./pages/cafe/CafeInfoPage.js"
import "./App.css";
import ThemePage from "./pages/theme/ThemePage.js";
import NoticePage from "./pages/notice/NoticePage.js";
import NewNoticePage from "./pages/notice/NewNoticePage.js";
import FaqPage from "./pages/faq/FaqPage.js";
import NewFaqPage from "./pages/faq/NewFaqPage.js";

function App() {

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<CafePage />} />
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/cafes/info" element={<CafeInfoPage />} />
        <Route path="/themes" element={<ThemePage />} />
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/notices/new" element={<NewNoticePage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/faqs/new" element={<NewFaqPage />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
