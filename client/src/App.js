import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import StartPage from "./views/StartPage";
import RegisterPage from "./views/RegisterPage";
import Dashboard from "./views/Dashboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
