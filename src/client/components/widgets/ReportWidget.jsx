import React from 'react';
import './ReportWidget.css';

export default function ReportWidget({ 
    title, 
    children, 
    className = '', 
    alerts = [], 
    onDrillDown, 
    loading = false 
}) {
    return (
        <div className={`report-widget ${className} ${loading ? 'loading' : ''}`}>
            <div className="widget-header">
                <h3 className="widget-title">{title}</h3>
                <div className="widget-actions">
                    {alerts && alerts.length > 0 && (
                        <div className="alerts">
                            {alerts.map((alert, index) => (
                                <span key={index} className={`alert alert-${alert.type}`}>
                                    {alert.message}
                                </span>
                            ))}
                        </div>
                    )}
                    {onDrillDown && (
                        <button 
                            className="drill-down-btn"
                            onClick={onDrillDown}
                            title="Drill down for details"
                        >
                            📊
                        </button>
                    )}
                </div>
            </div>
            <div className="widget-content">
                {loading ? (
                    <div className="widget-loading">
                        <div className="loading-spinner"></div>
                        <span>Loading...</span>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}