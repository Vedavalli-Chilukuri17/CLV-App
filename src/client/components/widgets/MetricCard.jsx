import React from 'react';
import './MetricCard.css';

export default function MetricCard({ 
    label, 
    value, 
    unit = '', 
    trend, 
    comparison, 
    className = '' 
}) {
    const formatValue = (val) => {
        if (val === null || val === undefined) return 'N/A';
        if (typeof val === 'number') {
            if (unit === '$') {
                return val.toLocaleString();
            } else if (unit === '%') {
                return val.toFixed(1);
            }
            return val.toLocaleString();
        }
        return val;
    };

    const getTrendIcon = (trendData) => {
        if (!trendData) return '';
        switch(trendData.direction) {
            case 'up': return trendData.positive ? '📈' : '📉';
            case 'down': return trendData.positive ? '📉' : '📈';
            default: return '➡️';
        }
    };

    const getTrendClass = (trendData) => {
        if (!trendData) return '';
        if (trendData.direction === 'stable') return 'stable';
        return trendData.positive ? 'positive' : 'negative';
    };

    return (
        <div className={`metric-card ${className}`}>
            <div className="metric-header">
                <span className="metric-label">{label}</span>
            </div>
            <div className="metric-value">
                {unit === '$' && <span className="currency">$</span>}
                <span className="value">{formatValue(value)}</span>
                {unit !== '$' && unit && <span className="unit">{unit}</span>}
            </div>
            {trend && (
                <div className={`metric-trend ${getTrendClass(trend)}`}>
                    <span className="trend-icon">{getTrendIcon(trend)}</span>
                    <span className="trend-text">
                        {trend.percentage.toFixed(1)}% 
                        {trend.direction === 'up' ? ' increase' : 
                         trend.direction === 'down' ? ' decrease' : ' stable'}
                    </span>
                </div>
            )}
            {comparison && (
                <div className="metric-comparison">
                    <span className="comparison-label">vs Last Year:</span>
                    <span className={`comparison-value ${comparison.lift >= 0 ? 'positive' : 'negative'}`}>
                        {comparison.lift >= 0 ? '+' : ''}{comparison.lift.toFixed(1)}
                        {unit === '$' ? '' : unit}
                    </span>
                </div>
            )}
        </div>
    );
}