import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import Attendance from "./Components/Attendance";
import Record from "./Components/Record";
import Teacher from "./Components/Teacher";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/record" element={<Record />} />
        <Route path="/admin" element={<Teacher />} />
      </Routes>
    </BrowserRouter> //used for navigating without rendering pages again and again
  );
};

export default App;
