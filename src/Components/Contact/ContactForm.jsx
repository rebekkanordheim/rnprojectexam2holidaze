import React, { useState } from "react";
import styles from "../../Button.module.css";

/**
 * ContactForm component
 *
 * Renders a contact form that includes validation for first name, last name, subject, email,
 * and message fields. Displays success or error messages based on form submission status.
 *
 * @returns {JSX.Element} The ContactForm component.
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    body: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.subject ||
      !formData.body
    ) {
      return "All fields are required.";
    }
    if (!emailPattern.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  }

  function onFormSubmit(event) {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      console.log("Form Data:", formData);
      setIsLoading(false);
      setFormSubmitted(true);
      setFormError("");
      setFormData({ firstName: "", lastName: "", subject: "", email: "", body: "" });
    }, 1000);
  }

  return (
    <div className="user-information">
      {formSubmitted && (
        <p className="success-message" aria-live="polite">
          Thank you for your submission!
        </p>
      )}
      {formError && (
        <p className="error-message" aria-live="assertive">
          {formError}
        </p>
      )}

      <form onSubmit={onFormSubmit} className="form">
        <h2>Or send us a message</h2>

        <label htmlFor="first-name">First name</label>
        <input
          name="firstName"
          value={formData.firstName}
          placeholder="Your first name"
          onChange={handleInputChange}
          required
          minLength={3}
          className="form-input"
        />

        <label htmlFor="last-name">Last name</label>
        <input
          name="lastName"
          value={formData.lastName}
          placeholder="Your last name"
          onChange={handleInputChange}
          required
          minLength={3}
          className="form-input"
        />

        <label htmlFor="subject">Subject</label>
        <input
          name="subject"
          value={formData.subject}
          placeholder="Subject"
          onChange={handleInputChange}
          required
          minLength={3}
          className="form-input"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Your email"
          onChange={handleInputChange}
          required
          className="form-input"
        />

        <label htmlFor="body">Message</label>
        <textarea
          name="body"
          value={formData.body}
          placeholder="Your message"
          onChange={handleInputChange}
          required
          minLength={3}
          className="form-textarea"
        />

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
