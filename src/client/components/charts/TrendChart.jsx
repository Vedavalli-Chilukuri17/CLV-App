import React from 'react';
import './TrendChart.css';

export default function TrendChart({ 
    data = [], 
    title = '', 
    height = 200, 
    showAxes = true, 
    showPrediction = false, 
    prediction = null, 
    sparkline = false 
}) {
    if (!data || data.length === 0) {
        return (
            <div className="trend-chart empty" style={{ height: `${height}px` }}>
                <div className="empty-message">No trend data available</div>
            </div>
        );
    }

    // Simple SVG chart implementation
    const chartWidth = sparkline ? 200 : 400;
    const chartHeight = height - (showAxes ? 40 : 10);
    const padding = sparkline ? 5 : 40;

    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    const getX = (index) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    const getY = (value) => padding + ((maxValue - value) * (chartHeight - 2 * padding)) / valueRange;

    // Generate path for line
    const pathData = data.map((point, index) => {
        const x = getX(index);
        const y = getY(point.value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Generate prediction line if enabled
    let predictionPath = '';
    if (showPrediction && prediction) {
        const lastX = getX(data.length - 1);
        const predX = lastX + (chartWidth - 2 * padding) / data.length;
        const predY = getY(prediction.value);
        predictionPath = `M ${lastX} ${getY(data[data.length - 1].value)} L ${predX} ${predY}`;
    }

    return (
        <div className={`trend-chart ${sparkline ? 'sparkline' : ''}`} style={{ height: `${height}px` }}>
            {!sparkline && title && <div className="chart-title">{title}</div>}
            <svg 
                width={chartWidth} 
                height={height}
                className="chart-svg"
            >
                {/* Grid lines for full charts */}
                {!sparkline && showAxes && (
                    <g className="grid">
                        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
                            <line
                                key={ratio}
                                x1={padding}
                                y1={padding + ratio * (chartHeight - 2 * padding)}
                                x2={chartWidth - padding}
                                y2={padding + ratio * (chartHeight - 2 * padding)}
                                className="grid-line"
                            />
                        ))}
                    </g>
                )}

                {/* Main trend line */}
                <path
                    d={pathData}
                    className="trend-line"
                    fill="none"
                    stroke={sparkline ? "#4CAF50" : "#2196F3"}
                    strokeWidth={sparkline ? 1.5 : 2}
                />

                {/* Prediction line */}
                {showPrediction && predictionPath && (
                    <path
                        d={predictionPath}
                        className="prediction-line"
                        fill="none"
                        stroke="#FF9800"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                )}

                {/* Data points for full charts */}
                {!sparkline && data.map((point, index) => (
                    <circle
                        key={index}
                        cx={getX(index)}
                        cy={getY(point.value)}
                        r="3"
                        className="data-point"
                        fill="#2196F3"
                    >
                        <title>{`${point.period}: ${point.value.toFixed(2)}`}</title>
                    </circle>
                ))}

                {/* Prediction confidence interval */}
                {showPrediction && prediction && prediction.confidence && (
                    <text
                        x={chartWidth - padding - 10}
                        y={padding + 20}
                        className="confidence-text"
                        textAnchor="end"
                        fontSize="10"
                        fill="#666"
                    >
                        {prediction.confidence}% confidence
                    </text>
                )}
            </svg>

            {/* Axes labels for full charts */}
            {!sparkline && showAxes && (
                <div className="chart-axes">
                    <div className="y-axis-labels">
                        <span className="max-value">{maxValue.toFixed(1)}</span>
                        <span className="min-value">{minValue.toFixed(1)}</span>
                    </div>
                    <div className="x-axis-labels">
                        <span className="start-period">{data[0]?.period}</span>
                        <span className="end-period">{data[data.length - 1]?.period}</span>
                    </div>
                </div>
            )}
        </div>
    );
}