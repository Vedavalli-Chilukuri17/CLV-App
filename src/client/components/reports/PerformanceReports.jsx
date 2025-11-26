import React from 'react';
import ReportWidget from '../widgets/ReportWidget.jsx';
import './PerformanceReports.css';

export default function PerformanceReports({ data, filters, onDrillDown, loading }) {
    if (loading && !data) {
        return (
            <div className="performance-reports loading">
                <div className="loading-placeholder">Loading performance reports...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="performance-reports empty">
                <div className="empty-state">No performance data available</div>
            </div>
        );
    }

    return (
        <div className="performance-reports">
            {/* Renewal Pipeline Funnel Report */}
            <ReportWidget
                title="Renewal Pipeline Funnel Report"
                className="pipeline-funnel-widget"
                onDrillDown={() => onDrillDown('renewal_pipeline', { segment: 'funnel' })}
            >
                <div className="funnel-visualization">
                    <div className="time-windows">
                        <div className="window-selector">
                            <button className="window-btn active" data-window="30">30 Days</button>
                            <button className="window-btn" data-window="60">60 Days</button>
                            <button className="window-btn" data-window="90">90 Days</button>
                        </div>
                    </div>
                    <div className="funnel-stages">
                        <div className="funnel-stage lead">
                            <div className="stage-label">Lead</div>
                            <div className="stage-count">145</div>
                            <div className="stage-value">$2.1M</div>
                        </div>
                        <div className="funnel-stage qualified">
                            <div className="stage-label">Qualified</div>
                            <div className="stage-count">98</div>
                            <div className="stage-value">$1.8M</div>
                        </div>
                        <div className="funnel-stage proposal">
                            <div className="stage-label">Proposal</div>
                            <div className="stage-count">67</div>
                            <div className="stage-value">$1.4M</div>
                        </div>
                        <div className="funnel-stage negotiation">
                            <div className="stage-label">Negotiation</div>
                            <div className="stage-count">34</div>
                            <div className="stage-value">$950K</div>
                        </div>
                        <div className="funnel-stage closed">
                            <div className="stage-label">Closed Won</div>
                            <div className="stage-count">23</div>
                            <div className="stage-value">$720K</div>
                        </div>
                    </div>
                    <div className="conversion-ratios">
                        <div className="ratio">Lead → Qualified: 67.6%</div>
                        <div className="ratio">Qualified → Proposal: 68.4%</div>
                        <div className="ratio">Proposal → Negotiation: 50.7%</div>
                        <div className="ratio">Negotiation → Closed: 67.6%</div>
                    </div>
                </div>
            </ReportWidget>

            {/* High-Risk Customer Analysis Report */}
            <ReportWidget
                title="High-Risk Customer Analysis Report"
                className="high-risk-analysis-widget"
                onDrillDown={() => onDrillDown('high_risk_customers', { analysis: 'risk_breakdown' })}
            >
                <div className="risk-heatmap">
                    <div className="tier-risk-matrix">
                        <div className="matrix-header">
                            <div className="risk-level critical">Critical (80+)</div>
                            <div className="risk-level high">High (60-79)</div>
                            <div className="risk-level medium">Medium (40-59)</div>
                            <div className="risk-level low">Low (&lt;40)</div>
                        </div>
                        <div className="tier-rows">
                            <div className="tier-row platinum">
                                <span className="tier-label">Platinum</span>
                                <div className="risk-cell critical">3</div>
                                <div className="risk-cell high">12</div>
                                <div className="risk-cell medium">8</div>
                                <div className="risk-cell low">2</div>
                            </div>
                            <div className="tier-row gold">
                                <span className="tier-label">Gold</span>
                                <div className="risk-cell critical">8</div>
                                <div className="risk-cell high">24</div>
                                <div className="risk-cell medium">18</div>
                                <div className="risk-cell low">6</div>
                            </div>
                            <div className="tier-row silver">
                                <span className="tier-label">Silver</span>
                                <div className="risk-cell critical">15</div>
                                <div className="risk-cell high">43</div>
                                <div className="risk-cell medium">67</div>
                                <div className="risk-cell low">23</div>
                            </div>
                            <div className="tier-row bronze">
                                <span className="tier-label">Bronze</span>
                                <div className="risk-cell critical">22</div>
                                <div className="risk-cell high">89</div>
                                <div className="risk-cell medium">134</div>
                                <div className="risk-cell low">78</div>
                            </div>
                        </div>
                    </div>
                    <div className="risk-summary">
                        <div className="summary-stat">
                            <span className="stat-label">Total at Risk:</span>
                            <span className="stat-value">361 customers</span>
                        </div>
                        <div className="summary-stat">
                            <span className="stat-label">Value at Risk:</span>
                            <span className="stat-value">$15.2M</span>
                        </div>
                        <div className="summary-stat">
                            <span className="stat-label">Avg Risk Score:</span>
                            <span className="stat-value">67.8</span>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* Engagement Rate Tracking Report */}
            <ReportWidget
                title="Engagement Rate Tracking Report"
                className="engagement-tracking-widget"
                onDrillDown={() => onDrillDown('engagement_tracking', { breakdown: 'channel' })}
            >
                <div className="channel-performance">
                    <div className="channel-cards">
                        <div className="channel-card app">
                            <div className="channel-icon">📱</div>
                            <div className="channel-name">App</div>
                            <div className="engagement-score">84.2%</div>
                            <div className="conversion-rate">12.3%</div>
                            <div className="channel-trend positive">+2.1%</div>
                        </div>
                        <div className="channel-card email">
                            <div className="channel-icon">✉️</div>
                            <div className="channel-name">Email</div>
                            <div className="engagement-score">67.8%</div>
                            <div className="conversion-rate">8.7%</div>
                            <div className="channel-trend negative">-0.8%</div>
                        </div>
                        <div className="channel-card call">
                            <div className="channel-icon">📞</div>
                            <div className="channel-name">Call</div>
                            <div className="engagement-score">91.5%</div>
                            <div className="conversion-rate">23.4%</div>
                            <div className="channel-trend positive">+4.2%</div>
                        </div>
                        <div className="channel-card advisor">
                            <div className="channel-icon">👥</div>
                            <div className="channel-name">Advisor</div>
                            <div className="engagement-score">96.3%</div>
                            <div className="conversion-rate">34.7%</div>
                            <div className="channel-trend positive">+1.9%</div>
                        </div>
                    </div>
                    <div className="attribution-analysis">
                        <h4>Channel Attribution</h4>
                        <div className="attribution-chart">
                            <div className="attribution-bar">
                                <div className="attribution-segment app" style={{ width: '25%' }}>App 25%</div>
                                <div className="attribution-segment email" style={{ width: '20%' }}>Email 20%</div>
                                <div className="attribution-segment call" style={{ width: '30%' }}>Call 30%</div>
                                <div className="attribution-segment advisor" style={{ width: '25%' }}>Advisor 25%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* Cross-Sell/Upsell Opportunity Report */}
            <ReportWidget
                title="Cross-Sell/Upsell Opportunity Report"
                className="crosssell-opportunity-widget"
                onDrillDown={() => onDrillDown('crosssell_opportunities', { analysis: 'opportunity_matrix' })}
            >
                <div className="opportunity-matrix">
                    <div className="matrix-grid">
                        <div className="opportunity-quadrant high-engagement-high-clv">
                            <h4>Champion Upsell</h4>
                            <div className="quadrant-stats">
                                <div className="stat-item">23 customers</div>
                                <div className="stat-item">$890K potential</div>
                            </div>
                            <div className="conversion-probability">87% success rate</div>
                        </div>
                        <div className="opportunity-quadrant high-engagement-low-clv">
                            <h4>Growth Opportunity</h4>
                            <div className="quadrant-stats">
                                <div className="stat-item">156 customers</div>
                                <div className="stat-item">$2.3M potential</div>
                            </div>
                            <div className="conversion-probability">63% success rate</div>
                        </div>
                        <div className="opportunity-quadrant low-engagement-high-clv">
                            <h4>Retention Focus</h4>
                            <div className="quadrant-stats">
                                <div className="stat-item">34 customers</div>
                                <div className="stat-item">$680K at risk</div>
                            </div>
                            <div className="conversion-probability">41% retention rate</div>
                        </div>
                        <div className="opportunity-quadrant low-engagement-low-clv">
                            <h4>Basic Maintenance</h4>
                            <div className="quadrant-stats">
                                <div className="stat-item">287 customers</div>
                                <div className="stat-item">$450K potential</div>
                            </div>
                            <div className="conversion-probability">28% success rate</div>
                        </div>
                    </div>
                    <div className="opportunity-insights">
                        <div className="insight">
                            <span className="insight-icon">💡</span>
                            <span className="insight-text">High-engagement, low-CLV customers show 3x conversion potential</span>
                        </div>
                        <div className="insight">
                            <span className="insight-icon">⚠️</span>
                            <span className="insight-text">34 high-value customers need immediate retention focus</span>
                        </div>
                    </div>
                </div>
            </ReportWidget>
        </div>
    );
}