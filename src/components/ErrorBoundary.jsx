import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    logErrorToMyService('Component did catch: ', error.message);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div className="px-4 py-2 m-4">
            <h2 className="mt-2 font-bold text-lg mb-1">
              Something went wrong.
            </h2>
            <p>{this.state.errorMessage}</p>
            <p>Intenta haciendo otra búsqueda.</p>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
