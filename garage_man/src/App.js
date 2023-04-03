import "./App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/createAccount";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";

import React from "react";
function App(){
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/CreateAccount" element={<CreateAccount/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </div>
  );
}
export default App;
