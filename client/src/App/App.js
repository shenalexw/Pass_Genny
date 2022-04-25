import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/Home";
import './App.css';
// import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}> </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
