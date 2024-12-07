import React from "react";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import { Helmet } from "react-helmet";

/**
 * Renders the ContactPage component.
 *
 * This component represents the contact page of the website. It includes a heading and
 * displays the ContactForm and ContactInformation components. It also sets the page title
 * and meta description for SEO using the `Helmet` component.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactPage component.
 */
function ContactPage() {
  return (
    <main className="contact-page">
      <Helmet>
        <title>Holidaze | Contact</title>
        <meta
          name="description"
          content="Get in touch with Holidaze for any inquiries, support, or booking questions. Contact us via email, phone, or our convenient contact form."
        />
      </Helmet>
      <h2>Contact us</h2>
      <ContactInformation />
      <ContactForm />
    </main>
  );
}

export default ContactPage;
