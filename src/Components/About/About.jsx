import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Holidaze-transparent.png";
import { Helmet } from "react-helmet";

/**
 * AboutPage component
 *
 * This component renders the About page of the Holidaze application.
 * It provides information about the platform, its purpose, and its features.
 * The component includes a title, descriptive paragraphs, and a logo linking back to the homepage.
 *
 * @returns {JSX.Element} The About page component.
 */

function AboutPage() {
  return (
    <div className="about-page">
      <Helmet>
        <title>Holidaze | About</title>
        <meta
          name="description"
          content="Learn more about Holidaze, your ultimate destination for seamless accommodation booking for both travelers and venue owners."
        />
      </Helmet>
      <section>
        <h1>Welcome to Holidaze</h1>
        <p>Your ultimate destination for hassle-free accommodation booking.</p>
      </section>
      <section>
        <p>
          At Holidaze, we're dedicated to providing a seamless and enjoyable experience
          for both travelers and venue owners alike. Our team has meticulously crafted a
          modern front-end interface tailored to meet your needs, leveraging the latest
          technologies and best practices in web development.
        </p>
        <p>
          Whether you're planning your dream getaway or managing your property listings,
          Holidaze offers intuitive tools and robust features to simplify the booking
          process.
        </p>
        <p>
          With our user-friendly platform, you can explore a diverse range of
          accommodations, make secure reservations, and even manage your bookings with
          ease. Join us on our journey to redefine the way you experience holidays, one
          booking at a time.
        </p>
        <p>Best regards from the team in</p>
      </section>
      <Link to="/">
        <img
          src={Logo}
          className="logo"
          alt="Holidaze Logo - Back to Home"
          loading="lazy"
        />
      </Link>
    </div>
  );
}

export default AboutPage;
