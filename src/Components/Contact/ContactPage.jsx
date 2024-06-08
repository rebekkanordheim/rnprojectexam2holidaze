import React from "react";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import { Helmet } from "react-helmet";

/**
 * Renders the ContactPage component.
 * This component displays the contact page with a heading and the ContactForm component.
 * It also sets the document title using the Helmet component.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactPage component.
 */
function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>Holidaze | Contact</title>
      </Helmet>
      <h2>Contact us</h2>
      <ContactInformation />
      <ContactForm />
    </div>
  );
}

export default ContactPage;
