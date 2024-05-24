/* import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
};

function Footer() {
    const token = localStorage.getItem('jwtToken');
    const isLoggedIn = !!token;

    return (
        <footer className='footer'>
            <p>&copy; Rebekka Nordheim 2024</p>
            <div>
                {isLoggedIn && (
                    <Link to='/newvenue' className='button-link'>Create New Venue</Link>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} className='button-link'>Logout</button>
                )}
            </div>
        </footer>
    );
}

export default Footer;
 */
import React from 'react';
import './App.css';

const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
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
