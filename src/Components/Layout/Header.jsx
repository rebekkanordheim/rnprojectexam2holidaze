/* import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/HolidazeLogo.png';

function Header() {
    const handleVenuesClick = () => {
        window.location.href = "/";
    };
    

    return (
        <div> 
            <nav className='nav'>
                <ul>
                    <li>
                        <Link to='/'>
                            <img src={Logo} className="logo" alt="Logo" />
                        </Link>
                    </li>
                    <li>
                        <Link to='/' onClick={handleVenuesClick}>Venues</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/loginregister'>Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
*/


import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/Holidaze-transparent.png';

function Header() {
    const handleVenuesClick = () => {
        window.location.href = "/";
    };

    return (
        <nav className='nav'>
            <div>
                <Link to='/'>
                    <img src={Logo} className="logo" alt="Logo" />
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/' onClick={handleVenuesClick}>Venues</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;