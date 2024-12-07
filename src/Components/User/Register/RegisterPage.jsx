import React from "react";
import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet";

/**
 * RegisterPage component that renders the user registration page with a form.
 * This component includes the RegisterForm and sets the page title using Helmet.
 *
 * @returns {JSX.Element} The rendered RegisterPage component with the registration form.
 */
const RegisterPage = () => {
  return (
    <div>
      <Helmet>
        <title>Holidaze | Register</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
