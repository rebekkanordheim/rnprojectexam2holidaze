import React, { useState } from "react";

/**
 * Component displaying contact information including opening hours, email, and phone number.
 *
 * @returns {JSX.Element} JSX element representing the ContactInformation component.
 */
function ContactInformation() {
  return (
    <div className="contact-information">
      <h3>Opening Hours</h3>
      <p>Monday - Friday: 08:00-16:00</p>
      <h3>Email Us</h3>
      <a href="mailto:hello@holidaze.com" className="contact-link">
        hello@holidaze.com
      </a>
      <h3>Call Us</h3>
      <a href="tel:+4745454545" className="contact-link">
        +4745454545
      </a>
    </div>
  );
}
export default ContactInformation;
