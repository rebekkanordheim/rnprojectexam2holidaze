import React, { useState } from "react";
import { registerUser } from "./registerUser";
import styles from "../../../Button.module.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.match(/^\w+$/)) {
      errors.name = "Name must not contain punctuation symbols apart from underscore (_).";
    }
    if (!formData.email.endsWith("@stud.noroff.no")) {
      errors.email = "Email must be a valid stud.noroff.no email address.";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await registerUser(formData.name, formData.email, formData.password, formData.avatarUrl);
        setSuccessMessage("Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          avatarUrl: "",
        });
        setErrors({});

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } catch (error) {
        console.error("Registration failed:", error);
        setSuccessMessage("");
        setErrors({ apiError: "Registration failed. Please try again." });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-information">
      <h2>Register</h2>
      {errors.apiError && <span className="error error-message">{errors.apiError}</span>}
      {successMessage && <span className="success success-message">{successMessage}</span>}
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
            <button type="button" onClick={toggleShowPassword} className="toggle-password">
              <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
            </button>
          </div>
          {errors.password && <span className="error error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="avatarUrl">Avatar URL:</label>
          <input
            type="text"
            id="avatarUrl"
            name="avatarUrl"
            value={formData.avatarUrl}
            placeholder="Your avatar url"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
