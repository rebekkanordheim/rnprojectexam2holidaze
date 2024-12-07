import React from "react";

/**
 * Component displaying contact information including opening hours, email, and phone number.
 *
 * This component provides structured contact details for users, including business hours,
 * an email link, and a phone number link. It uses schema.org markup for better SEO and
 * accessibility, defining the organization information.
 *
 * @returns {JSX.Element} The rendered ContactInformation component.
 */
function ContactInformation() {
  return (
    <section
      className="contact-information"
      itemScope
      itemType="http://schema.org/Organization">
      <h3>Opening Hours</h3>
      <p>Monday - Friday: 08:00-16:00</p>

      <h3>Email Us</h3>
      <a
        href="mailto:hello@holidaze.com"
        className="contact-link"
        itemProp="email"
        aria-label="Send an email to hello@holidaze.com">
        hello@holidaze.com
      </a>

      <h3>Call Us</h3>
      <a
        href="tel:+4745454545"
        className="contact-link"
        itemProp="telephone"
        aria-label="Call us at +47 45 45 45 45">
        +47 45 45 45 45
      </a>
    </section>
  );
}

export default ContactInformation;
