import React from 'react';
import PropTypes from 'prop-types';

const ErrorBoundaryView = ({ error, info }) => (
  <div>
    <span>{JSON.stringify(error)}</span>
    <span>{JSON.stringify(info)}</span>
  </div>
);

ErrorBoundaryView.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  info: PropTypes.instanceOf(React.ErrorInfo).isRequired
};

export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    hasError: false,
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({
      error,
      info,
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryView error={this.state.error} info={this.state.info} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
