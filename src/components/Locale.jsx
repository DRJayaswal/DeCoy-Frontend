/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';

const Locale = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userContact, setUserContact] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('/api/v1/users/register', {
                userName: userName,
                userEmail: userEmail,
                userContact: userContact,
                userPassword: userPassword,
            });
            console.log(response.data);
            setSuccess('Registration successful!');
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Registration failed');
        }
        setIsLoading(false);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Contact:</label>
                    <input
                        type="tel"
                        value={userContact}
                        onChange={(e) => setUserContact(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" disabled={isLoading} className="form-button">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {error && <p className="form-error">{error}</p>}
                {success && <p className="form-success">{success}</p>}
            </form>
        </div>
    );
};

export default Locale;