import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import StartPage from "./views/StartPage";
import RegisterPage from "./views/RegisterPage";
import Dashboard from "./views/Dashboard";
import DetailPage from "./views/DetailPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/:id" element={<DetailPage/>} />
      </Routes>
    </div>
  );
}

export default App;
