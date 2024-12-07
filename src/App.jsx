import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Layout/Home";
import SpecificVenue from "./Components/Venues/SpecificVenue";
import ContactPage from "./Components/Contact/ContactPage";
import AboutPage from "./Components/About/About";
import NewVenueForm from "./Components/Venues/NewVenueForm";
import Layout from "./Components/Layout/Layout";
import RegisterPage from "./Components/User/Register/RegisterPage";
import LoginPage from "./Components/User/Login/LoginPage";
import Profile from "./Components/User/Profile/Profile";

/**
 * Main application component that handles routing and layout.
 *
 * This component sets up the routes for the application and renders the corresponding components
 * based on the URL path. It also includes a layout component that is displayed on all pages.
 *
 * @returns {JSX.Element} The main App component that renders the routing setup.
 */
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/newvenue" element={<NewVenueForm />} />
        <Route path="*" element={<div>Route not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
