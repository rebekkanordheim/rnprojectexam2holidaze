import React from 'react';
import './App.css';
import { isLoggedIn } from '../User/authUtils';

const handleLogout = () => {
    /* localStorage.removeItem('jwtToken'); */
    localStorage.clear();
    window.location.href = '/';
};

function Footer() {
    const loggedIn = isLoggedIn();

    const handleNewVenueClick = () => {
        window.location.href = '/newvenue';
    };

    return (
        <footer className='footer'>
            <p>&copy; Rebekka Nordheim 2024</p>
            <div>
                {loggedIn && (
                    <button onClick={handleNewVenueClick} className='button-link'>Create New Venue</button>
                )}
                {loggedIn && (
                    <button onClick={handleLogout} className='button-link'>Logout</button>
                )}
            </div>
        </footer>
    );
}

export default Footer;