import React from 'react';
import './DashboardFilters.css';

export default function DashboardFilters({ filters, onFilterChange, loading }) {
    const handleFilterUpdate = (key, value) => {
        onFilterChange({ [key]: value });
    };

    return (
        <div className="dashboard-filters">
            <div className="filters-container">
                <div className="filter-group primary">
                    <label className="filter-label">
                        📅 Timeframe
                        <select 
                            value={filters.timeframe} 
                            onChange={(e) => handleFilterUpdate('timeframe', e.target.value)}
                            className="filter-select timeframe"
                            disabled={loading}
                        >
                            <option value="7">Last 7 Days</option>
                            <option value="30">Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                            <option value="180">Last 6 Months</option>
                            <option value="365">Last Year</option>
                        </select>
                    </label>

                    <label className="filter-label">
                        🏆 Customer Tier
                        <select 
                            value={filters.customerTier} 
                            onChange={(e) => handleFilterUpdate('customerTier', e.target.value)}
                            className="filter-select tier"
                            disabled={loading}
                        >
                            <option value="all">All Tiers</option>
                            <option value="platinum">Platinum</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="bronze">Bronze</option>
                        </select>
                    </label>

                    <label className="filter-label">
                        📊 Segment
                        <select 
                            value={filters.segment} 
                            onChange={(e) => handleFilterUpdate('segment', e.target.value)}
                            className="filter-select segment"
                            disabled={loading}
                        >
                            <option value="all">All Segments</option>
                            <option value="high_value">High Value</option>
                            <option value="growth">Growth Potential</option>
                            <option value="at_risk">At Risk</option>
                            <option value="new_customer">New Customers</option>
                        </select>
                    </label>
                </div>

                <div className="filter-group advanced">
                    <label className="filter-label">
                        🔄 Refresh Interval
                        <select 
                            value={filters.refreshInterval} 
                            onChange={(e) => handleFilterUpdate('refreshInterval', parseInt(e.target.value))}
                            className="filter-select refresh"
                            disabled={loading}
                        >
                            <option value="0">Manual Only</option>
                            <option value="60000">1 Minute</option>
                            <option value="300000">5 Minutes</option>
                            <option value="900000">15 Minutes</option>
                            <option value="1800000">30 Minutes</option>
                        </select>
                    </label>

                    <div className="filter-actions">
                        <button 
                            className="filter-btn reset"
                            onClick={() => onFilterChange({
                                timeframe: '30',
                                customerTier: 'all',
                                segment: 'all',
                                refreshInterval: 300000
                            })}
                            disabled={loading}
                        >
                            Reset Filters
                        </button>
                        <button 
                            className="filter-btn apply"
                            onClick={() => {
                                // Trigger a manual refresh with current filters
                                window.location.hash = `#refresh-${Date.now()}`;
                            }}
                            disabled={loading}
                        >
                            Apply $[AMP] Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Filter Presets */}
            <div className="quick-filters">
                <div className="preset-label">Quick Filters:</div>
                <button 
                    className="quick-filter-btn"
                    onClick={() => onFilterChange({
                        timeframe: '30',
                        customerTier: 'platinum',
                        segment: 'high_value'
                    })}
                    disabled={loading}
                >
                    🏆 High Value Focus
                </button>
                <button 
                    className="quick-filter-btn"
                    onClick={() => onFilterChange({
                        timeframe: '90',
                        customerTier: 'all',
                        segment: 'at_risk'
                    })}
                    disabled={loading}
                >
                    ⚠️ Risk Analysis
                </button>
                <button 
                    className="quick-filter-btn"
                    onClick={() => onFilterChange({
                        timeframe: '7',
                        customerTier: 'all',
                        segment: 'all'
                    })}
                    disabled={loading}
                >
                    📈 Real-time View
                </button>
                <button 
                    className="quick-filter-btn"
                    onClick={() => onFilterChange({
                        timeframe: '365',
                        customerTier: 'all',
                        segment: 'all'
                    })}
                    disabled={loading}
                >
                    📊 Annual Overview
                </button>
            </div>

            {/* Active Filters Display */}
            {(filters.customerTier !== 'all' || filters.segment !== 'all' || filters.timeframe !== '30') && (
                <div className="active-filters">
                    <span className="active-filters-label">Active Filters:</span>
                    {filters.timeframe !== '30' && (
                        <span className="active-filter">
                            📅 {filters.timeframe} days
                            <button onClick={() => handleFilterUpdate('timeframe', '30')}>✕</button>
                        </span>
                    )}
                    {filters.customerTier !== 'all' && (
                        <span className="active-filter">
                            🏆 {filters.customerTier}
                            <button onClick={() => handleFilterUpdate('customerTier', 'all')}>✕</button>
                        </span>
                    )}
                    {filters.segment !== 'all' && (
                        <span className="active-filter">
                            📊 {filters.segment.replace('_', ' ')}
                            <button onClick={() => handleFilterUpdate('segment', 'all')}>✕</button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}