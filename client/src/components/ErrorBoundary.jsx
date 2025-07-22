import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is called if an error is thrown in a child component
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  // This lifecycle method is called after an error has been thrown
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error in component:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Example: send to a logging service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-center mb-6">
            We're sorry, but there was an unexpected error.
            Please try refreshing the page or contact support if the issue persists.
          </p>
          {/* Optional: Display error details in development for debugging */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md max-w-lg overflow-auto">
              <summary className="font-semibold cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-sm whitespace-pre-wrap break-words">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children; // Render children normally if no error
  }
}

export default ErrorBoundary;
