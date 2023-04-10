import "./App.css";
import Login from "./pages/Login.js";
import CreateAccount from "./pages/createAccount.js";
//import Header from "./Header/Header.tsx";
import PrivateRoutes from "./PrivateRoutes.js";
import  Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import React from "react";
import MainLayout from "./MainLayout.js";


function App(){
  return(
    <div className="App">
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route element={<MainLayout/>}>
              <Route path="/Home" element={<Home/>}/>
            </Route>
          </Route>
          <Route path="/" element={<Login/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
        </Routes>
    </div>

  );
}
export default App;
