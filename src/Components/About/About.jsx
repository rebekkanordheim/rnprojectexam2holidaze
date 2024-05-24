import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Holidaze-transparent.png';

function AboutPage() {
    return (
        <div className='form'>
            <h1>Welcome to Holidazee</h1>
            <p>Your ultimate destination for hassle-free accommodation booking.</p>
            <p>At Holidaze, we're dedicated to providing a seamless and enjoyable experience for both travelers and venue owners alike. Our team has meticulously crafted a modern front-end interface tailored to meet your needs, leveraging the latest technologies and best practices in web development.</p>
            <p>Whether you're planning your dream getaway or managing your property listings, Holidaze offers intuitive tools and robust features to simplify the booking process.</p>
            <p>With our user-friendly platform, you can explore a diverse range of accommodations, make secure reservations, and even manage your bookings with ease. Join us on our journey to redefine the way you experience holidays, one booking at a time.</p>
            <p>Best regards from the team behind</p>
            <Link to='/'>
                <img src={Logo} className="logo" alt="Logo" />
            </Link>

        </div >
    );
}

export default AboutPage;
