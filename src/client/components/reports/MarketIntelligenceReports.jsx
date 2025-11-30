import React from 'react';
import ReportWidget from '../widgets/ReportWidget.jsx';
import './MarketIntelligenceReports.css';

export default function MarketIntelligenceReports({ data, filters, onDrillDown, loading }) {
    if (loading && !data) {
        return (
            <div className="market-intelligence-reports loading">
                <div className="loading-placeholder">Loading market intelligence...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="market-intelligence-reports empty">
                <div className="empty-state">No market intelligence data available</div>
            </div>
        );
    }

    return (
        <div className="market-intelligence-reports">
            {/* Competitor Benchmarking Report */}
            <ReportWidget
                title="Competitor Benchmarking Report"
                className="competitor-benchmarking-widget"
                onDrillDown={() => onDrillDown('competitor_benchmarking', { analysis: 'detailed_comparison' })}
            >
                <div className="competitor-comparison">
                    <div className="comparison-metrics">
                        <div className="metric-comparison premium">
                            <h4>Premium Pricing</h4>
                            <div className="comparison-chart">
                                <div className="competitor-bar">
                                    <div className="bar-label">Us</div>
                                    <div className="bar our-value" style={{ height: '85%' }}>$1,247</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor A</div>
                                    <div className="bar competitor-value" style={{ height: '78%' }}>$1,156</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor B</div>
                                    <div className="bar competitor-value" style={{ height: '92%' }}>$1,378</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Industry Avg</div>
                                    <div className="bar industry-value" style={{ height: '80%' }}>$1,189</div>
                                </div>
                            </div>
                            <div className="performance-delta positive">+4.9% above industry</div>
                        </div>

                        <div className="metric-comparison renewal-rate">
                            <h4>Renewal Rate</h4>
                            <div className="comparison-chart">
                                <div className="competitor-bar">
                                    <div className="bar-label">Us</div>
                                    <div className="bar our-value" style={{ height: '92%' }}>87.3%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor A</div>
                                    <div className="bar competitor-value" style={{ height: '85%' }}>82.1%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor B</div>
                                    <div className="bar competitor-value" style={{ height: '78%' }}>74.6%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Industry Avg</div>
                                    <div className="bar industry-value" style={{ height: '80%' }}>76.8%</div>
                                </div>
                            </div>
                            <div className="performance-delta positive">+13.7% above industry</div>
                        </div>

                        <div className="metric-comparison claims-ratio">
                            <h4>Claims Ratio</h4>
                            <div className="comparison-chart">
                                <div className="competitor-bar">
                                    <div className="bar-label">Us</div>
                                    <div className="bar our-value good" style={{ height: '65%' }}>67.2%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor A</div>
                                    <div className="bar competitor-value" style={{ height: '78%' }}>74.8%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Competitor B</div>
                                    <div className="bar competitor-value" style={{ height: '85%' }}>82.1%</div>
                                </div>
                                <div className="competitor-bar">
                                    <div className="bar-label">Industry Avg</div>
                                    <div className="bar industry-value" style={{ height: '80%' }}>76.5%</div>
                                </div>
                            </div>
                            <div className="performance-delta positive">-12.1% below industry (better)</div>
                        </div>
                    </div>
                    <div className="competitive-insights">
                        <div className="insight-card">
                            <h4>Key Strengths</h4>
                            <ul>
                                <li>Superior renewal rates drive customer loyalty</li>
                                <li>Efficient claims management reduces costs</li>
                                <li>Premium pricing reflects quality positioning</li>
                            </ul>
                        </div>
                        <div className="insight-card">
                            <h4>Opportunities</h4>
                            <ul>
                                <li>Leverage low claims ratio for competitive advantage</li>
                                <li>Justify premium with superior service metrics</li>
                                <li>Target Competitor B's high-churn customers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* Customer Segmentation Report */}
            <ReportWidget
                title="Customer Segmentation Report"
                className="customer-segmentation-widget"
                onDrillDown={() => onDrillDown('customer_segmentation', { view: 'detailed_breakdown' })}
            >
                <div className="segmentation-analysis">
                    <div className="tier-distribution">
                        <div className="distribution-chart">
                            <div className="tier-segment platinum" style={{ flexBasis: '12%' }}>
                                <div className="segment-label">Platinum</div>
                                <div className="segment-percentage">12%</div>
                                <div className="segment-count">1,247 customers</div>
                            </div>
                            <div className="tier-segment gold" style={{ flexBasis: '23%' }}>
                                <div className="segment-label">Gold</div>
                                <div className="segment-percentage">23%</div>
                                <div className="segment-count">2,398 customers</div>
                            </div>
                            <div className="tier-segment silver" style={{ flexBasis: '41%' }}>
                                <div className="segment-label">Silver</div>
                                <div className="segment-percentage">41%</div>
                                <div className="segment-count">4,267 customers</div>
                            </div>
                            <div className="tier-segment bronze" style={{ flexBasis: '24%' }}>
                                <div className="segment-label">Bronze</div>
                                <div className="segment-percentage">24%</div>
                                <div className="segment-count">2,498 customers</div>
                            </div>
                        </div>
                    </div>
                    <div className="segmentation-overlays">
                        <div className="overlay-analysis">
                            <h4>Segment Performance</h4>
                            <table className="performance-table">
                                <thead>
                                    <tr>
                                        <th>Tier</th>
                                        <th>Avg CLV</th>
                                        <th>Retention Rate</th>
                                        <th>Growth Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="platinum">
                                        <td>Platinum</td>
                                        <td>$156,789</td>
                                        <td>96.7%</td>
                                        <td>+18.3%</td>
                                    </tr>
                                    <tr className="gold">
                                        <td>Gold</td>
                                        <td>$78,234</td>
                                        <td>91.2%</td>
                                        <td>+12.1%</td>
                                    </tr>
                                    <tr className="silver">
                                        <td>Silver</td>
                                        <td>$34,567</td>
                                        <td>87.8%</td>
                                        <td>+8.7%</td>
                                    </tr>
                                    <tr className="bronze">
                                        <td>Bronze</td>
                                        <td>$18,923</td>
                                        <td>82.4%</td>
                                        <td>+3.2%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* CLV and Brand Analysis Report */}
            <ReportWidget
                title="CLV $[AMP] Brand Analysis Report"
                className="clv-brand-analysis-widget"
                onDrillDown={() => onDrillDown('clv_brand_analysis', { view: 'histogram_bands' })}
            >
                <div className="clv-brand-analysis">
                    <div className="clv-histogram">
                        <h4>CLV Distribution Bands</h4>
                        <div className="histogram-chart">
                            <div className="histogram-bar" style={{ height: '20%' }}>
                                <div className="bar-value">8%</div>
                                <div className="bar-label">$0-25K</div>
                            </div>
                            <div className="histogram-bar" style={{ height: '45%' }}>
                                <div className="bar-value">31%</div>
                                <div className="bar-label">$25-50K</div>
                            </div>
                            <div className="histogram-bar" style={{ height: '65%' }}>
                                <div className="bar-value">28%</div>
                                <div className="bar-label">$50-75K</div>
                            </div>
                            <div className="histogram-bar" style={{ height: '50%' }}>
                                <div className="bar-value">19%</div>
                                <div className="bar-label">$75-100K</div>
                            </div>
                            <div className="histogram-bar" style={{ height: '35%' }}>
                                <div className="bar-value">10%</div>
                                <div className="bar-label">$100-150K</div>
                            </div>
                            <div className="histogram-bar" style={{ height: '20%' }}>
                                <div className="bar-value">4%</div>
                                <div className="bar-label">$150K+</div>
                            </div>
                        </div>
                        <div className="percentile-ranges">
                            <div className="percentile-marker p25">
                                <div className="percentile-label">25th Percentile</div>
                                <div className="percentile-value">$31,247</div>
                            </div>
                            <div className="percentile-marker p50">
                                <div className="percentile-label">Median</div>
                                <div className="percentile-value">$52,389</div>
                            </div>
                            <div className="percentile-marker p75">
                                <div className="percentile-label">75th Percentile</div>
                                <div className="percentile-value">$87,456</div>
                            </div>
                        </div>
                    </div>
                    <div className="brand-affinity">
                        <h4>Brand Affinity Scoring</h4>
                        <div className="affinity-metrics">
                            <div className="affinity-score high">
                                <div className="score-label">High Affinity</div>
                                <div className="score-percentage">34%</div>
                                <div className="score-description">Strong brand loyalty, premium pricing acceptance</div>
                            </div>
                            <div className="affinity-score medium">
                                <div className="score-label">Medium Affinity</div>
                                <div className="score-percentage">51%</div>
                                <div className="score-description">Price-conscious but receptive to value propositions</div>
                            </div>
                            <div className="affinity-score low">
                                <div className="score-label">Low Affinity</div>
                                <div className="score-percentage">15%</div>
                                <div className="score-description">Price-driven, high churn risk</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* Risk Factor Scoring Report */}
            <ReportWidget
                title="Risk Factor Scoring Report"
                className="risk-factor-scoring-widget"
                onDrillDown={() => onDrillDown('risk_factor_scoring', { analysis: 'factor_breakdown' })}
            >
                <div className="risk-factor-analysis">
                    <div className="risk-categories">
                        <div className="risk-category credit">
                            <h4>Credit Risk</h4>
                            <div className="risk-score-circle">
                                <div className="score-display">72.3</div>
                                <div className="score-label">Score</div>
                            </div>
                            <div className="risk-factors">
                                <div className="factor">Payment History: 68</div>
                                <div className="factor">Credit Utilization: 75</div>
                                <div className="factor">Length of History: 78</div>
                            </div>
                            <div className="impact-level medium">Medium Impact</div>
                        </div>

                        <div className="risk-category property">
                            <h4>Property Risk</h4>
                            <div className="risk-score-circle">
                                <div className="score-display">58.7</div>
                                <div className="score-label">Score</div>
                            </div>
                            <div className="risk-factors">
                                <div className="factor">Location Risk: 62</div>
                                <div className="factor">Property Age: 54</div>
                                <div className="factor">Construction Type: 60</div>
                            </div>
                            <div className="impact-level low">Low Impact</div>
                        </div>

                        <div className="risk-category combined">
                            <h4>Combined Risk</h4>
                            <div className="risk-score-circle">
                                <div className="score-display">65.5</div>
                                <div className="score-label">Score</div>
                            </div>
                            <div className="risk-factors">
                                <div className="factor">Weighted Credit: 72</div>
                                <div className="factor">Weighted Property: 59</div>
                                <div className="factor">Behavioral: 66</div>
                            </div>
                            <div className="impact-level medium">Medium Impact</div>
                        </div>
                    </div>
                    <div className="geographic-segmentation">
                        <h4>Risk by Geography</h4>
                        <div className="geo-risk-map">
                            <div className="region high-risk">Northeast: 78.2</div>
                            <div className="region medium-risk">Southeast: 64.1</div>
                            <div className="region low-risk">Midwest: 52.7</div>
                            <div className="region medium-risk">West: 69.3</div>
                        </div>
                    </div>
                </div>
            </ReportWidget>

            {/* Claims Impact Modeling Report */}
            <ReportWidget
                title="Claims Impact Modeling Report"
                className="claims-impact-modeling-widget"
                onDrillDown={() => onDrillDown('claims_impact_modeling', { view: 'impact_matrix' })}
            >
                <div className="claims-impact-analysis">
                    <div className="impact-matrix">
                        <h4>Frequency vs Severity Analysis</h4>
                        <div className="matrix-grid">
                            <div className="impact-quadrant high-freq-high-sev">
                                <div className="quadrant-label">High Frequency<br/>High Severity</div>
                                <div className="quadrant-stats">
                                    <div className="stat">Claims: 1,247</div>
                                    <div className="stat">Avg Cost: $18,500</div>
                                    <div className="stat">Total: $23.1M</div>
                                </div>
                                <div className="impact-level critical">Critical Impact</div>
                            </div>
                            <div className="impact-quadrant low-freq-high-sev">
                                <div className="quadrant-label">Low Frequency<br/>High Severity</div>
                                <div className="quadrant-stats">
                                    <div className="stat">Claims: 234</div>
                                    <div className="stat">Avg Cost: $45,200</div>
                                    <div className="stat">Total: $10.6M</div>
                                </div>
                                <div className="impact-level high">High Impact</div>
                            </div>
                            <div className="impact-quadrant high-freq-low-sev">
                                <div className="quadrant-label">High Frequency<br/>Low Severity</div>
                                <div className="quadrant-stats">
                                    <div className="stat">Claims: 3,456</div>
                                    <div className="stat">Avg Cost: $2,100</div>
                                    <div className="stat">Total: $7.3M</div>
                                </div>
                                <div className="impact-level medium">Medium Impact</div>
                            </div>
                            <div className="impact-quadrant low-freq-low-sev">
                                <div className="quadrant-label">Low Frequency<br/>Low Severity</div>
                                <div className="quadrant-stats">
                                    <div className="stat">Claims: 892</div>
                                    <div className="stat">Avg Cost: $1,200</div>
                                    <div className="stat">Total: $1.1M</div>
                                </div>
                                <div className="impact-level low">Low Impact</div>
                            </div>
                        </div>
                    </div>
                    <div className="product-segmentation">
                        <h4>Impact by Product Line</h4>
                        <table className="product-impact-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Claims Count</th>
                                    <th>Frequency Rate</th>
                                    <th>Avg Severity</th>
                                    <th>Financial Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Auto Insurance</td>
                                    <td>2,847</td>
                                    <td>12.3%</td>
                                    <td>$8,400</td>
                                    <td>$23.9M</td>
                                </tr>
                                <tr>
                                    <td>Home Insurance</td>
                                    <td>1,356</td>
                                    <td>8.7%</td>
                                    <td>$15,600</td>
                                    <td>$21.2M</td>
                                </tr>
                                <tr>
                                    <td>Life Insurance</td>
                                    <td>289</td>
                                    <td>2.1%</td>
                                    <td>$67,800</td>
                                    <td>$19.6M</td>
                                </tr>
                                <tr>
                                    <td>Commercial</td>
                                    <td>337</td>
                                    <td>5.4%</td>
                                    <td>$32,100</td>
                                    <td>$10.8M</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ReportWidget>
        </div>
    );
}