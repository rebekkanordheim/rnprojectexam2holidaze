import React from 'react';
import LoginForm from './LoginForm';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
    return (
        <div>
            <Helmet>
                <title>Holidaze | Login</title> {/* Set the title */}
            </Helmet>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
