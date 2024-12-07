import React, { useState } from "react";
import { loginUser } from "./loginUser";
import styles from "../../../Button.module.css";
import { Link } from "react-router-dom";

/**
 * LoginForm component allows users to log in by submitting their email and password.
 * Includes form validation and handles successful or failed login attempts.
 * @component
 */
const LoginForm = () => {
  /** State to manage form input data. */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /** State to store form validation errors. */
  const [errors, setErrors] = useState({});

  /** State to manage the success message displayed after login. */
  const [successMessage, setSuccessMessage] = useState("");

  /** State to toggle password visibility. */
  const [showPassword, setShowPassword] = useState(false);

  /** State to disable the button and show a loading state during form submission. */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles input field changes and updates form data state.
   * @param {Object} e - Event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /**
   * Validates the form data and sets error messages if validation fails.
   * @returns {boolean} - Returns true if the form is valid, otherwise false.
   */
  const validateForm = () => {
    const errors = {};
    if (!formData.email.endsWith("@stud.noroff.no")) {
      errors.email = "Email must be a valid stud.noroff.no email address.";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission, validates data, attempts login, and redirects on success.
   * @param {Object} e - Event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const user = await loginUser(formData.email, formData.password);

        setSuccessMessage("Login successful!");
        setErrors({});

        // Save user data to localStorage
        localStorage.setItem("jwtToken", user.data.accessToken);
        localStorage.setItem("email", user.data.email);
        localStorage.setItem(
          "avatarImage",
          user.data.avatarImage ||
            "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
        );
        localStorage.setItem(
          "bio",
          user.data.bio || "This is a default bio for the user."
        );

        setFormData({ email: "", password: "" });

        // Redirect to home page
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ apiError: "Login failed. Please try again." });
      } finally {
        setIsSubmitting(false);
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
      <h2>Login</h2>
      {errors.apiError && <span className="error-message">{errors.apiError}</span>}
      {successMessage && <span className="success-message">{successMessage}</span>}
      <form onSubmit={handleSubmit} className="form">
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
          {errors.email && <span className="error-message">{errors.email}</span>}
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
              className="toggle-password"
              aria-label={showPassword ? "Hide password" : "Show password"}>
              <i
                className={
                  showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                }></i>
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <Link to="/register">Not a user? Register here.</Link>
      </form>
    </div>
  );
};

export default LoginForm;
