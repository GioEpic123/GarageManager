import "./App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/createAccount";
import Header from "./pages/Header.tsx";

import { Route, Routes } from "react-router-dom";

import React from "react";
function App(){
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/CreateAccount" element={<CreateAccount/>}/>
        <Route path="/Header" element={<Header/>}/>
      </Routes>
    </div>
  );
}
export default App;
