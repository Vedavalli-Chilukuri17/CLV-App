import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading...', size = 'medium' }) {
    return (
        <div className={`loading-spinner ${size}`}>
            <div className="spinner-animation">
                <div className="spinner-circle"></div>
            </div>
            <div className="spinner-message">{message}</div>
        </div>
    );
}