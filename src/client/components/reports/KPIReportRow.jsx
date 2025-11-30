import React from 'react';
import ReportWidget from '../widgets/ReportWidget.jsx';
import TrendChart from '../charts/TrendChart.jsx';
import MetricCard from '../widgets/MetricCard.jsx';
import './KPIReportRow.css';

export default function KPIReportRow({ data, filters, onDrillDown, loading }) {
    if (loading && !data) {
        return (
            <div className="kpi-report-row loading">
                <div className="loading-placeholder">Loading KPI reports...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="kpi-report-row empty">
                <div className="empty-state">No KPI data available</div>
            </div>
        );
    }

    return (
        <div className="kpi-report-row">
            {/* Renewal Conversion Rate Report */}
            <ReportWidget
                title={data.renewalConversion?.title}
                className="renewal-conversion-widget"
                onDrillDown={() => onDrillDown('renewal_conversion', data.renewalConversion?.drillDown?.params)}
            >
                <MetricCard
                    label="Current Rate"
                    value={data.renewalConversion?.currentValue}
                    unit={data.renewalConversion?.unit}
                    trend={data.renewalConversion?.trend}
                    comparison={data.renewalConversion?.comparison}
                />
                <div className="chart-container">
                    <TrendChart
                        data={data.renewalConversion?.historical}
                        title="Historical Trend"
                        height={120}
                        showPrediction={true}
                        prediction={data.renewalConversion?.prediction}
                    />
                </div>
                <div className="report-controls">
                    <select defaultValue={filters.timeframe} className="timeframe-selector">
                        <option value="7">7 Days</option>
                        <option value="30">30 Days</option>
                        <option value="90">90 Days</option>
                        <option value="365">1 Year</option>
                    </select>
                </div>
            </ReportWidget>

            {/* Churn Rate Monitoring Report */}
            <ReportWidget
                title={data.churnMonitoring?.title}
                className="churn-monitoring-widget"
                alerts={data.churnMonitoring?.alerts}
                onDrillDown={() => onDrillDown('churn_monitoring', data.churnMonitoring?.drillDown?.params)}
            >
                <MetricCard
                    label="Current Churn Rate"
                    value={data.churnMonitoring?.currentValue}
                    unit={data.churnMonitoring?.unit}
                    trend={data.churnMonitoring?.trend}
                    className="churn-metric"
                />
                <div className="tier-segmentation">
                    <h4>Risk by Tier</h4>
                    <div className="tier-breakdown">
                        {Object.entries(data.churnMonitoring?.tierSegmentation || {}).map(([tier, count]) => (
                            <div key={tier} className={`tier-item ${tier}`}>
                                <span className="tier-label">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                                <span className="tier-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="projection">
                    <h4>Q1 Projection</h4>
                    <span className="projection-value">
                        {data.churnMonitoring?.projection?.nextQuarter?.toFixed(1)}%
                    </span>
                    <span className="confidence">
                        ({data.churnMonitoring?.projection?.confidence}% confidence)
                    </span>
                </div>
            </ReportWidget>

            {/* CLV by Customer Tier Report */}
            <ReportWidget
                title={data.clvByTier?.title}
                className="clv-tier-widget"
                onDrillDown={() => onDrillDown('clv_by_tier', data.clvByTier?.drillDown?.params)}
            >
                <div className="tier-analysis">
                    {Object.entries(data.clvByTier?.tierAnalysis || {}).map(([tier, analysis]) => (
                        <div key={tier} className={`tier-clv-card ${tier}`}>
                            <div className="tier-header">
                                <span className="tier-name">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                                <span className="customer-count">({analysis.customerCount} customers)</span>
                            </div>
                            <div className="tier-clv">
                                ${analysis.averageCLV?.toLocaleString()}
                            </div>
                            <div className="tier-trend">
                                <TrendChart
                                    data={analysis.trend}
                                    height={40}
                                    showAxes={false}
                                    sparkline={true}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="percentile-distribution">
                    <h4>CLV Distribution</h4>
                    <div className="distribution-chart-placeholder">
                        [Histogram Chart]
                    </div>
                </div>
            </ReportWidget>

            {/* Campaign ROI Tracking Report */}
            <ReportWidget
                title={data.campaignROI?.title}
                className="campaign-roi-widget"
                onDrillDown={() => onDrillDown('campaign_roi', data.campaignROI?.drillDown?.params)}
            >
                <MetricCard
                    label="Current ROI"
                    value={data.campaignROI?.currentValue}
                    unit={data.campaignROI?.unit}
                    trend={data.campaignROI?.trend}
                    comparison={data.campaignROI?.comparison}
                />
                <div className="best-performer">
                    <h4>Top Campaign</h4>
                    <div className="campaign-highlight">
                        <div className="campaign-name">{data.campaignROI?.bestPerformer?.campaign}</div>
                        <div className="campaign-roi">{data.campaignROI?.bestPerformer?.roi?.toFixed(1)}% ROI</div>
                        <div className="campaign-details">
                            Revenue: ${data.campaignROI?.bestPerformer?.revenue?.toLocaleString()}
                        </div>
                    </div>
                </div>
                <div className="channel-breakdown">
                    <h4>Channel Performance</h4>
                    <div className="channel-list">
                        {Object.entries(data.campaignROI?.channelBreakdown || {}).map(([channel, performance]) => (
                            <div key={channel} className="channel-item">
                                <span className="channel-name">{channel}</span>
                                <span className="channel-roi">{performance?.roi?.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ReportWidget>

            {/* Projected Renewals Report */}
            <ReportWidget
                title={data.projectedRenewals?.title}
                className="projected-renewals-widget"
                onDrillDown={() => onDrillDown('projected_renewals', data.projectedRenewals?.drillDown?.params)}
            >
                <MetricCard
                    label="Projected Value"
                    value={data.projectedRenewals?.currentValue}
                    unit={data.projectedRenewals?.unit}
                    className="projection-metric"
                />
                <div className="confidence-scoring">
                    <h4>Confidence Score</h4>
                    <div className="confidence-score">
                        <div className="score-value">{data.projectedRenewals?.confidence?.score}%</div>
                        <div className="confidence-intervals">
                            <div className="interval high">High: {data.projectedRenewals?.confidence?.intervals?.high}</div>
                            <div className="interval low">Low: {data.projectedRenewals?.confidence?.intervals?.low}</div>
                        </div>
                    </div>
                </div>
                <div className="tier-projections">
                    <h4>By Tier</h4>
                    <div className="tier-projection-list">
                        {Object.entries(data.projectedRenewals?.tierBreakdown || {}).map(([tier, projection]) => (
                            <div key={tier} className={`tier-projection ${tier}`}>
                                <span className="tier-name">{tier}</span>
                                <span className="projection-amount">${projection?.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pipeline-summary">
                    <h4>Pipeline Status</h4>
                    <div className="pipeline-stats">
                        <div className="stat">Total: {data.projectedRenewals?.pipeline?.total}</div>
                        <div className="stat">Qualified: {data.projectedRenewals?.pipeline?.qualified}</div>
                        <div className="stat">Proposal: {data.projectedRenewals?.pipeline?.proposal}</div>
                    </div>
                </div>
            </ReportWidget>
        </div>
    );
}