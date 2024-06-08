import React from "react";
import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet";

/**
 * Page component for user registration.
 *
 * @returns {JSX.Element} The rendered RegisterPage component.
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
