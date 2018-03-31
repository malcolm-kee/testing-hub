import React from 'react';
import { Link } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';

import Header from './Header';

const LandingContainer = () => (
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

export const Landing = props => (
  <ErrorBoundary>
    <LandingContainer {...props} />
  </ErrorBoundary>
);

export default Landing;
