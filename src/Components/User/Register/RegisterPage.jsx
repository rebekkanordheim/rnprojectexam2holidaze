import React from 'react';
import RegisterForm from './RegisterForm';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
    return (
        <div>
            <Helmet>
                <title>Holidaze | Register</title> {/* Set the title */}
            </Helmet>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;

