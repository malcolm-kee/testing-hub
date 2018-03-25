import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { selectors } from './reducers';

import Header from './Header';

class LandingContainer extends Component {
  componentWillMount() {
    if (this.props.loggedIn === true) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Header showLogin />
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="landing-message">
                <h1 className="heading">Welcome!</h1>
                <img src="/images/logo.png" alt="Testing Hub Logo" width="200" height="200" />
                <div className="btn-toolbar">
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-success">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: selectors.getLoginState(state) });

LandingContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

const Landing = props => (
  <ErrorBoundary>
    <LandingContainer {...props} />
  </ErrorBoundary>
);

export default connect(mapStateToProps)(withRouter(Landing));
