import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import FreeNavbar from "../components/navbar/freenavbar/FreeNavbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import useToken from '../components/useToken/useToken';
import useIdentification from "../components/useIdentification/useIdentification";
import SnackbarProvider from 'react-simple-snackbar'
import './App.css';
import View from "../pages/view/View";

function App() {
  const { token, setToken } = useToken();
  const { identification, setIdentification } = useIdentification();

  // If a user is not logged in
  if (!token && !identification) {
    return <>
      <SnackbarProvider>
        <Router>
          <div className="App">
            <FreeNavbar />
            <Routes>
              <Route path="/" element={<Home token={token} identification={identification} />}> </Route>
              <Route path="/login" element={<Login setToken={setToken} setIdentification={setIdentification} />}> </Route>
              <Route path="/register" element={<Register setToken={setToken} setIdentification={setIdentification} />}> </Route>
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </>
  }

  // If a user is logged in
  return (
    <>
      <SnackbarProvider>
        <Router>
          <div className="App">
            <Navbar setToken={setToken} setIdentification={setIdentification} />
            <Routes>
              <Route path="/" element={<Home token={token} identification={identification} />}> </Route>
              <Route path="/view" element={<View token={token} identification={identification} />}> </Route>
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;
