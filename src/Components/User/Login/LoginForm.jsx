import React, { useState } from 'react';
import { loginUser } from './loginUser';
import styles from '../../../Button.module.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email.endsWith('@stud.noroff.no')) {
            errors.email = 'Email must be a valid stud.noroff.no email address.';
        }
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const user = await loginUser(formData.email, formData.password);
                setSuccessMessage('Login successful!');
                setFormData({
                    email: '',
                    password: ''
                });
                setErrors({});
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } catch (error) {
                console.error('Login failed:', error);
                setSuccessMessage('');
                setErrors({ apiError: 'Login failed. Please try again.' });
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='user-information'>
            <h2>Login</h2>
            {successMessage && <span className='success success-message'>{successMessage}</span>}
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        placeholder='Your email'
                        onChange={handleChange}
                        className='form-input'
                    />
                    {errors.email && <span className='error error-message'>{errors.email}</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <div className='password-input-container'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            placeholder='Your password'
                            onChange={handleChange}
                            className='form-input'
                        />
                        <button type='button' onClick={toggleShowPassword} className='toggle-password'>
                            <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                        </button>
                    </div>
                    {errors.password && <span className='error error-message'>{errors.password}</span>}
                </div>
                {errors.apiError && <span className='error error-message'>{errors.apiError}</span>}
                <button type='submit' className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
