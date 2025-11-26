import React, { useState, useEffect } from 'react';
import ReportWidget from '../widgets/ReportWidget.jsx';
import InteractiveTable from '../widgets/InteractiveTable.jsx';
import './DataTablesSection.css';

export default function DataTablesSection({ data, filters, onDrillDown, loading }) {
    const [activeTable, setActiveTable] = useState('clvAnalytics');
    const [tableFilters, setTableFilters] = useState({
        search: '',
        tier: 'all',
        sortBy: '',
        sortOrder: 'asc'
    });

    if (loading && !data) {
        return (
            <div className="data-tables-section loading">
                <div className="loading-placeholder">Loading data tables...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="data-tables-section empty">
                <div className="empty-state">No data table views available</div>
            </div>
        );
    }

    const handleFilterChange = (newFilters) => {
        setTableFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleTableSwitch = (tableName) => {
        setActiveTable(tableName);
        setTableFilters({ search: '', tier: 'all', sortBy: '', sortOrder: 'asc' });
    };

    return (
        <div className="data-tables-section">
            {/* Table Navigation */}
            <div className="table-navigation">
                <div className="table-tabs">
                    <button 
                        className={`table-tab ${activeTable === 'clvAnalytics' ? 'active' : ''}`}
                        onClick={() => handleTableSwitch('clvAnalytics')}
                    >
                        CLV Analytics ({data.clvAnalytics?.totalCount || 0})
                    </button>
                    <button 
                        className={`table-tab ${activeTable === 'campaignAnalytics' ? 'active' : ''}`}
                        onClick={() => handleTableSwitch('campaignAnalytics')}
                    >
                        Campaign Data ({data.campaignAnalytics?.totalCount || 0})
                    </button>
                    <button 
                        className={`table-tab ${activeTable === 'renewalPipeline' ? 'active' : ''}`}
                        onClick={() => handleTableSwitch('renewalPipeline')}
                    >
                        Renewal Pipeline ({data.renewalPipeline?.totalCount || 0})
                    </button>
                    <button 
                        className={`table-tab ${activeTable === 'marketIntelligence' ? 'active' : ''}`}
                        onClick={() => handleTableSwitch('marketIntelligence')}
                    >
                        Market Intelligence ({data.marketIntelligence?.totalCount || 0})
                    </button>
                </div>
                <div className="table-actions">
                    <button className="export-btn" title="Export to Excel">
                        📊 Export
                    </button>
                    <button className="refresh-btn" title="Refresh data">
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Interactive Features Panel */}
            <div className="interactive-features">
                <div className="feature-group filtering">
                    <h4>🔍 Filtering</h4>
                    <div className="filter-controls">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={tableFilters.search}
                            onChange={(e) => handleFilterChange({ search: e.target.value })}
                            className="search-input"
                        />
                        {activeTable === 'clvAnalytics' && (
                            <select 
                                value={tableFilters.tier}
                                onChange={(e) => handleFilterChange({ tier: e.target.value })}
                                className="tier-filter"
                            >
                                <option value="all">All Tiers</option>
                                <option value="platinum">Platinum</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="bronze">Bronze</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="feature-group analysis">
                    <h4>📈 Analysis Tools</h4>
                    <div className="analysis-buttons">
                        <button 
                            className="analysis-btn"
                            onClick={() => onDrillDown('upsell_analysis', { table: activeTable, filters: tableFilters })}
                        >
                            Upsell Analysis
                        </button>
                        <button 
                            className="analysis-btn"
                            onClick={() => onDrillDown('trend_analysis', { table: activeTable, filters: tableFilters })}
                        >
                            Trend Analysis  
                        </button>
                        <button 
                            className="analysis-btn"
                            onClick={() => onDrillDown('segment_analysis', { table: activeTable, filters: tableFilters })}
                        >
                            Segment Analysis
                        </button>
                    </div>
                </div>

                <div className="feature-group refresh">
                    <h4>🔄 Real-time Updates</h4>
                    <div className="refresh-controls">
                        <div className="refresh-status">
                            <span className="status-indicator active"></span>
                            <span className="status-text">Live data feed active</span>
                        </div>
                        <div className="refresh-interval">
                            <label>Update every:</label>
                            <select defaultValue="300000">
                                <option value="60000">1 minute</option>
                                <option value="300000">5 minutes</option>
                                <option value="900000">15 minutes</option>
                                <option value="1800000">30 minutes</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Data Table */}
            <ReportWidget
                title={`${getTableTitle(activeTable)} - Interactive Data View`}
                className="data-table-widget"
                onDrillDown={() => onDrillDown(`${activeTable}_detail`, { filters: tableFilters })}
            >
                <InteractiveTable
                    data={data[activeTable]?.data || []}
                    columns={data[activeTable]?.columns || []}
                    filters={tableFilters}
                    onFilterChange={handleFilterChange}
                    onRowClick={(row) => onDrillDown('row_detail', { table: activeTable, row })}
                    sortable={true}
                    searchable={true}
                    paginated={true}
                    pageSize={50}
                />
                
                {/* Table Summary Stats */}
                <div className="table-summary">
                    <div className="summary-stats">
                        <div className="stat-item">
                            <span className="stat-label">Total Records:</span>
                            <span className="stat-value">{data[activeTable]?.totalCount?.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Displayed:</span>
                            <span className="stat-value">{data[activeTable]?.data?.length}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Last Updated:</span>
                            <span className="stat-value">{new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <div className="quick-actions">
                        <button 
                            className="action-btn"
                            onClick={() => onDrillDown('bulk_action', { table: activeTable, action: 'export_selected' })}
                        >
                            Export Selected
                        </button>
                        <button 
                            className="action-btn"
                            onClick={() => onDrillDown('bulk_action', { table: activeTable, action: 'create_report' })}
                        >
                            Create Report
                        </button>
                    </div>
                </div>
            </ReportWidget>
        </div>
    );
}

function getTableTitle(tableKey) {
    const titles = {
        clvAnalytics: 'CLV Analytics',
        campaignAnalytics: 'Campaign Analytics', 
        renewalPipeline: 'Renewal Pipeline',
        marketIntelligence: 'Market Intelligence'
    };
    return titles[tableKey] || 'Data Table';
}