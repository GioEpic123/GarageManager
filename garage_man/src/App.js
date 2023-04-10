import "./App.css";
import Login from "./pages/Login.js";
import CreateAccount from "./pages/createAccount.js";
import PrivateRoutes from "./PrivateRoutes.js";
import  Home from "./pages/Home.tsx";
import Tickets from "./pages/Tickets.tsx";
import Vehicles from "./pages/Vehicles.tsx";
import Settings from "./pages/Settings.tsx";
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
              <Route path="/Tickets" element={<Tickets/>}/>
              <Route path="/Vehicles" element={<Vehicles/>}/>
              <Route path="/Settings" element={<Settings/>}/>
            </Route>
          </Route>
          <Route path="/" element={<Login/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
        </Routes>
    </div>

  );
}
export default App;
