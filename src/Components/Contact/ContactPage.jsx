import React from 'react';
import ContactForm from './ContactForm';
import { Helmet } from 'react-helmet';

function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>Holidaze | Contact</title>
      </Helmet>
      <h2>Contact us</h2>
      <ContactForm />
    </div>
  );
}

export default ContactPage;