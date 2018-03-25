import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = props => (
  <div className="panel panel-danger">
    <div className="panel-heading">
      <h3 className="panel-title">Sorry</h3>
    </div>
    <div className="panel-body">
      <p className="text-xxlarge">Please try again later.</p>
      <pre>{JSON.stringify(JSON.parse(props.errorMessage), null, 4)}</pre>
    </div>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
};

ErrorMessage.defaultProps = {
  errorMessage: 'No error code'
};

export default ErrorMessage;
