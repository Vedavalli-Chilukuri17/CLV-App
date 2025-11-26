import React, { useState, useMemo } from 'react';
import { display, value } from '../../utils/fields.js';
import './InteractiveTable.css';

export default function InteractiveTable({ 
    data = [], 
    columns = [], 
    filters = {}, 
    onFilterChange, 
    onRowClick, 
    sortable = true, 
    searchable = true, 
    paginated = true, 
    pageSize = 25 
}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // Filter and sort data
    const processedData = useMemo(() => {
        let filtered = [...data];

        // Apply search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(row =>
                columns.some(col => {
                    const cellValue = display(row[col]) || '';
                    return cellValue.toLowerCase().includes(searchTerm);
                })
            );
        }

        // Apply tier filter (if applicable)
        if (filters.tier && filters.tier !== 'all') {
            filtered = filtered.filter(row => 
                value(row.customer_tier) === filters.tier
            );
        }

        // Apply sorting
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = display(a[sortConfig.key]) || '';
                const bVal = display(b[sortConfig.key]) || '';
                
                // Try to parse as numbers first
                const aNum = parseFloat(aVal);
                const bNum = parseFloat(bVal);
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
                }
                
                // Fall back to string comparison
                return sortConfig.direction === 'asc' 
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }

        return filtered;
    }, [data, columns, filters, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
        if (!paginated) return processedData;
        
        const start = currentPage * pageSize;
        const end = start + pageSize;
        return processedData.slice(start, end);
    }, [processedData, currentPage, pageSize, paginated]);

    const totalPages = Math.ceil(processedData.length / pageSize);

    const handleSort = (columnKey) => {
        if (!sortable) return;
        
        setSortConfig(prev => ({
            key: columnKey,
            direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    };

    const formatColumnHeader = (columnKey) => {
        return columnKey
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    const formatCellValue = (row, columnKey) => {
        const cellValue = display(row[columnKey]);
        
        // Special formatting for specific column types
        if (columnKey.includes('clv') || columnKey.includes('value') || columnKey.includes('revenue')) {
            const numValue = parseFloat(cellValue);
            if (!isNaN(numValue)) {
                return `$${numValue.toLocaleString()}`;
            }
        }
        
        if (columnKey.includes('date')) {
            const date = new Date(cellValue);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString();
            }
        }
        
        if (columnKey.includes('percentage') || columnKey.includes('rate') || columnKey.includes('roi')) {
            const numValue = parseFloat(cellValue);
            if (!isNaN(numValue)) {
                return `${numValue.toFixed(1)}%`;
            }
        }

        return cellValue || '';
    };

    const getCellClassName = (row, columnKey) => {
        const cellValue = value(row[columnKey]);
        let className = 'table-cell';
        
        // Add tier-specific classes
        if (columnKey === 'customer_tier') {
            className += ` tier-${cellValue}`;
        }
        
        // Add risk-specific classes
        if (columnKey === 'is_high_risk' && cellValue === 'true') {
            className += ' high-risk';
        }
        
        // Add numerical classes
        if (columnKey.includes('clv') || columnKey.includes('value')) {
            const numValue = parseFloat(cellValue);
            if (!isNaN(numValue)) {
                if (numValue > 100000) className += ' high-value';
                else if (numValue < 25000) className += ' low-value';
            }
        }

        return className;
    };

    if (!data || data.length === 0) {
        return (
            <div className="interactive-table empty">
                <div className="empty-message">No data available</div>
            </div>
        );
    }

    return (
        <div className="interactive-table">
            {/* Table Controls */}
            <div className="table-controls">
                <div className="results-info">
                    Showing {paginatedData.length} of {processedData.length} records
                    {processedData.length !== data.length && ` (filtered from ${data.length})`}
                </div>
                {paginated && totalPages > 1 && (
                    <div className="pagination-controls">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="page-btn"
                        >
                            ← Previous
                        </button>
                        <span className="page-info">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="page-btn"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>

            {/* Data Table */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th 
                                    key={column}
                                    className={`table-header ${sortable ? 'sortable' : ''} ${sortConfig.key === column ? `sorted-${sortConfig.direction}` : ''}`}
                                    onClick={() => handleSort(column)}
                                >
                                    <span className="header-text">
                                        {formatColumnHeader(column)}
                                    </span>
                                    {sortable && (
                                        <span className="sort-indicator">
                                            {sortConfig.key === column ? 
                                                (sortConfig.direction === 'asc' ? '↑' : '↓') : 
                                                '↕'
                                            }
                                        </span>
                                    )}
                                </th>
                            ))}
                            <th className="table-header actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr 
                                key={value(row.sys_id) || index}
                                className={`table-row ${onRowClick ? 'clickable' : ''}`}
                                onClick={onRowClick ? () => onRowClick(row) : undefined}
                            >
                                {columns.map(column => (
                                    <td 
                                        key={column}
                                        className={getCellClassName(row, column)}
                                        title={display(row[column])}
                                    >
                                        {formatCellValue(row, column)}
                                    </td>
                                ))}
                                <td className="table-cell actions">
                                    <button 
                                        className="action-btn view"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onRowClick) onRowClick(row);
                                        }}
                                        title="View details"
                                    >
                                        👁
                                    </button>
                                    <button 
                                        className="action-btn analyze"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle analyze action
                                        }}
                                        title="Analyze"
                                    >
                                        📊
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Pagination */}
            {paginated && totalPages > 1 && (
                <div className="table-footer">
                    <div className="pagination-info">
                        {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, processedData.length)} of {processedData.length}
                    </div>
                    <div className="pagination-controls">
                        <button 
                            onClick={() => handlePageChange(0)}
                            disabled={currentPage === 0}
                            className="page-btn"
                        >
                            First
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="page-btn"
                        >
                            Previous
                        </button>
                        
                        {/* Page number buttons */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(0, Math.min(currentPage - 2 + i, totalPages - 1));
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                >
                                    {pageNum + 1}
                                </button>
                            );
                        })}

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="page-btn"
                        >
                            Next
                        </button>
                        <button 
                            onClick={() => handlePageChange(totalPages - 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="page-btn"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}