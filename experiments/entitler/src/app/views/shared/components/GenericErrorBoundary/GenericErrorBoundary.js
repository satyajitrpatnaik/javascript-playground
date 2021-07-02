import React from "react";

class GenericErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ margin: "20% 28% 0" }}>
          <h1 style={{ color: "#fff", textAlign: "center" }}>
            Something went wrong. Please reload the website. If it persists,
            please contact the support team.
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GenericErrorBoundary;
