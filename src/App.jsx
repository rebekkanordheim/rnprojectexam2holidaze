/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */


import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Layout/Home";
import SpecificVenue from './Components/Venues/SpecificVenue';
import ContactPage from './Components/Contact/ContactPage';
import AboutPage from "./Components/About/About";
import NewVenueForm from "./Components/Venues/NewVenueForm";
import Layout from "./Components/Layout/Layout";
import RegisterPage from "./Components/User/Register/RegisterPage";
import LoginPage from "./Components/User/Login/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue/:id" element={<SpecificVenue />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newvenue" element={<NewVenueForm />} />
        <Route path="*" element={<div>Route not found</div>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;