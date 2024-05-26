import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Layout/Home';
import SpecificVenue from './Components/Venues/SpecificVenue';
import ContactPage from './Components/Contact/ContactPage';
import AboutPage from './Components/About/About';
import NewVenueForm from './Components/Venues/NewVenueForm';
import Layout from './Components/Layout/Layout';
import RegisterPage from './Components/User/Register/RegisterPage';
import LoginPage from './Components/User/Login/LoginPage';
import BookingCart from './Components/Venues/BookingCart';

function App() {
  const [bookingCart, setBookingCart] = useState(() => {
    const savedCart = localStorage.getItem('bookingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToBookingCart = (venue) => {
    setBookingCart((prevCart) => [...prevCart, venue]);
  };

  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/venue/:id' element={<SpecificVenue addToBookingCart={addToBookingCart} />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/newvenue' element={<NewVenueForm />} />
        <Route path='/booking-cart' element={<BookingCart bookingCart={bookingCart} setBookingCart={setBookingCart} />} />
        <Route path='*' element={<div>Route not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
