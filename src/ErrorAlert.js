// ErrorAlert.js
import React from 'react';
import './ErrorAlert.css'; // Add your own styles

const ErrorAlert = ({ message }) => {
    return (
        <div className="ErrorAlert">
            <h2>Error</h2>
            <p>{message}</p>
        </div>
    );
};

export default ErrorAlert;
