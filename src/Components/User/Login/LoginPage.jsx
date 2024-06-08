import React from "react";
import LoginForm from "./LoginForm";
import { Helmet } from "react-helmet";

/**
 * LoginPage component for rendering the login form.
 *
 * @returns {JSX.Element} The rendered LoginPage component.
 */
const LoginPage = () => {
  return (
    <div>
      <Helmet>
        <title>Holidaze | Login</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
