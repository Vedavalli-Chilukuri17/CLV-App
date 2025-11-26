import React from 'react';
import ReactDOM from 'react-dom/client';
import CLVDashboardApp from './clv-dashboard-app.jsx';

const rootElement = document.getElementById('clv-dashboard-root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <CLVDashboardApp />
        </React.StrictMode>
    );
}