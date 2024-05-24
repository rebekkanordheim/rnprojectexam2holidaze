import React from 'react';
import './App.css';

const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
};

function Footer() {
    const token = localStorage.getItem('jwtToken');
    const isLoggedIn = !!token;

    const handleNewVenueClick = () => {
        window.location.href = '/newvenue';
    };

    return (
        <footer className='footer'>
            <p>&copy; Rebekka Nordheim 2024</p>
            <div>
                {isLoggedIn && (
                    <button onClick={handleNewVenueClick} className='button-link'>Create New Venue</button>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} className='button-link'>Logout</button>
                )}
            </div>
        </footer>
    );
}

export default Footer;
