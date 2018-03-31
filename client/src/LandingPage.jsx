import React from 'react';

export const LandingPage = () => (
  <div>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Testing Hub
          </a>
        </div>
      </div>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <div className="container">
          <object type="image/svg+xml" data="/images/logo.svg">
            Loading...
          </object>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
