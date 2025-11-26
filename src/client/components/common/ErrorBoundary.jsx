import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Log error to console in development
        console.error('Dashboard Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-container">
                        <h2>⚠️ Dashboard Error</h2>
                        <p>Something went wrong while loading the dashboard.</p>
                        <details className="error-details">
                            <summary>Error Details</summary>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                            <pre>{this.state.errorInfo.componentStack}</pre>
                        </details>
                        <button 
                            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                            className="retry-button"
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="reload-button"
                        >
                            Reload Dashboard
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;