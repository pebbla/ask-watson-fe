
import React from "react";
import SideBar from "./components/common/sidebar/SideBar";
import { BrowserRouter, Routes, Route, Switch} from "react-router-dom";
// import { Route, Switch } from 'react-router';
import Cafe from "./pages/cafe/Cafe";
import "./App.css";

function App() {

  return (
    <div>
      <SideBar />
      <Cafe />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Cafe />} />
    //     {/* <Route path="users/*" element={<Users />} /> */}
    //   </Routes>
    //   <Route path="/" exact={true} component={Cafe} />
      
    // </BrowserRouter>
  );


}

export default App;
