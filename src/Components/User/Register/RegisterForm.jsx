import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./registerUser";
import styles from "../../../Button.module.css";
import { Link } from "react-router-dom";

/**
 * RegisterForm component allows users to register by providing their name, email, and password.
 * It validates the input, handles form submission, and displays success or error messages.
 * @component
 */
const RegisterForm = () => {
  const navigate = useNavigate();

  /** State to manage the form data for name, email, and password. */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /** State to manage validation errors for each form field. */
  const [errors, setErrors] = useState({});

  /** State to manage the success message after successful registration. */
  const [successMessage, setSuccessMessage] = useState("");

  /** State to toggle password visibility. */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles the change in any input field of the form.
   * @param {Object} e - Event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validates the form data to ensure all required fields are filled correctly.
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const errors = {};

    // Check for name field
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    // Validate email field (must be in stud.noroff.no domain)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Email must be a valid stud.noroff.no email address.";
    }

    // Check for password field
    if (!formData.password.trim() || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles the form submission, validates the form, and registers the user.
   * It also handles success and error messages.
   * @async
   * @param {Object} e - Event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Attempt to register the user
        await registerUser(formData);

        // Save user data to localStorage
        localStorage.setItem("name", formData.name);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("avatarImage", "/path/to/default-avatar.jpg"); // Adjust as needed
        localStorage.setItem("bio", "This is a default bio for the user.");

        // Show success message and reset form
        setSuccessMessage("Registration successful! Redirecting to login...");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setErrors({});

        // Hide the success message after 3 seconds and redirect to login
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Registration failed:", error);

        // Show error message
        setErrors({ apiError: "Registration failed. Please try again." });

        // Hide the error message after 2 seconds
        setTimeout(() => setErrors({}), 2000);
      }
    }
  };

  /**
   * Toggles the visibility of the password input field.
   */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-information">
      <h2>Register</h2>
      {errors.apiError && <span className="error error-message">{errors.apiError}</span>}
      {successMessage && (
        <span className="success success-message">{successMessage}</span>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">First name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Your first name"
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <span className="error error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Your email"
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <span className="error error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              placeholder="Your password"
              onChange={handleChange}
              className="form-input"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password">
              <i
                className={
                  showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                }></i>
            </button>
          </div>
          {errors.password && (
            <span className="error error-message">{errors.password}</span>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
        <Link to="/login">Already have an account? Login here.</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
