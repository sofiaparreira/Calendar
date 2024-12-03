import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import TaskDetails from "./TaskDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        
        <Route path="/:id/details" element={<TaskDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
