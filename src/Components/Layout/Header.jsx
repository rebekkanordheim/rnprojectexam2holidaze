/* import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from '../../images/Holidaze-transparent.png';
import { isLoggedIn } from '../User/authUtils';

function Header() {
    const loggedIn = isLoggedIn();

    return (
        <nav className='nav'>
            <div>
                <Link to='/'>
                    <img src={Logo} className='logo' alt='Logo' />
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/'>Venues</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from '../../images/Holidaze-transparent.png';
import { isLoggedIn } from '../User/authUtils';

function Header() {
    const loggedIn = isLoggedIn();

    return (
        <nav className='nav'>
            <div>
                <Link to='/'>
                    <img src={Logo} className='logo' alt='Logo' />
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/'>Venues</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to='/booking-cart'>Booking Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
