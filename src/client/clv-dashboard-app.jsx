import React, { useState, useEffect } from 'react';
import './clv-dashboard.css';

export default function CLVDashboardApp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock data for demonstration
    const mockData = {
        kpis: {
            renewalConversionRate: 87.3,
            churnRate: 4.2,
            avgCLV: 52389,
            campaignROI: 284.5,
            projectedRenewals: 2100000
        }
    };

    useEffect(() => {
        console.log('Dashboard initialized successfully');
    }, []);

    return (
        <div className="clv-dashboard">
            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>CLV Maximizer Analytics Dashboard</h1>
                    <div className="header-controls">
                        <span className="status-dot active"></span>
                        <span>Dashboard Loaded Successfully</span>
                    </div>
                </div>
            </header>

            {/* Quick Demo Content */}
            <section className="dashboard-section">
                <h2>Enhanced KPI Reports</h2>
                <div className="demo-kpis">
                    <div className="kpi-card">
                        <h3>Renewal Conversion Rate</h3>
                        <div className="kpi-value">{mockData.kpis.renewalConversionRate}%</div>
                        <div className="kpi-trend positive">📈 +2.1% vs last month</div>
                    </div>
                    
                    <div className="kpi-card">
                        <h3>Churn Rate</h3>
                        <div className="kpi-value">{mockData.kpis.churnRate}%</div>
                        <div className="kpi-trend positive">📉 -0.8% vs last month</div>
                    </div>
                    
                    <div className="kpi-card">
                        <h3>Average CLV</h3>
                        <div className="kpi-value">${mockData.kpis.avgCLV.toLocaleString()}</div>
                        <div className="kpi-trend positive">📈 +12.3% vs last month</div>
                    </div>
                    
                    <div className="kpi-card">
                        <h3>Campaign ROI</h3>
                        <div className="kpi-value">{mockData.kpis.campaignROI}%</div>
                        <div className="kpi-trend positive">📈 +15.7% vs last month</div>
                    </div>
                    
                    <div className="kpi-card">
                        <h3>Projected Renewals</h3>
                        <div className="kpi-value">${(mockData.kpis.projectedRenewals / 1000000).toFixed(1)}M</div>
                        <div className="kpi-confidence">85% confidence</div>
                    </div>
                </div>
            </section>

            {/* Performance Metrics Demo */}
            <section className="dashboard-section">
                <h2>Performance Metrics Reports</h2>
                <div className="demo-performance">
                    <div className="performance-widget">
                        <h3>Renewal Pipeline Funnel</h3>
                        <div className="funnel-demo">
                            <div className="funnel-stage">Lead: 145 ($2.1M)</div>
                            <div className="funnel-stage">Qualified: 98 ($1.8M)</div>
                            <div className="funnel-stage">Proposal: 67 ($1.4M)</div>
                            <div className="funnel-stage">Closed: 23 ($720K)</div>
                        </div>
                    </div>
                    
                    <div className="performance-widget">
                        <h3>High-Risk Customers</h3>
                        <div className="risk-matrix">
                            <div className="risk-item critical">Critical Risk: 48 customers</div>
                            <div className="risk-item high">High Risk: 156 customers</div>
                            <div className="risk-item medium">Medium Risk: 234 customers</div>
                            <div className="risk-value">Total Value at Risk: $15.2M</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market Intelligence Demo */}
            <section className="dashboard-section">
                <h2>Market Intelligence Reports</h2>
                <div className="demo-intelligence">
                    <div className="intelligence-widget">
                        <h3>Competitor Benchmarking</h3>
                        <div className="benchmark-stats">
                            <div className="benchmark-item">Premium: +4.9% above industry</div>
                            <div className="benchmark-item">Renewal Rate: +13.7% above industry</div>
                            <div className="benchmark-item">Claims Ratio: -12.1% below industry (better)</div>
                        </div>
                    </div>
                    
                    <div className="intelligence-widget">
                        <h3>Customer Segmentation</h3>
                        <div className="tier-distribution">
                            <div className="tier-item platinum">Platinum: 12% (1,247 customers)</div>
                            <div className="tier-item gold">Gold: 23% (2,398 customers)</div>
                            <div className="tier-item silver">Silver: 41% (4,267 customers)</div>
                            <div className="tier-item bronze">Bronze: 24% (2,498 customers)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Status Message */}
            <div className="status-message">
                <h3>✅ Dashboard Status: Operational</h3>
                <p>The CLV Maximizer Analytics Dashboard is running successfully. All core components have been loaded and are displaying sample data.</p>
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Connect to live data sources through the data tables</li>
                    <li>Configure real-time data refresh intervals</li>
                    <li>Set up user-specific filtering and preferences</li>
                    <li>Enable drill-down navigation to detailed reports</li>
                </ul>
            </div>
        </div>
    );
}