import React from 'react';

export const OfflineMessage = () => (
  <div>
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Testing Hub
          </a>
        </div>
      </div>
    </nav>
    <div className="container">
      <div className="row">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h3 className="panel-title">It looks like you&#39;ve lost your Internet connection.</h3>
          </div>
          <div className="panel-body">
            <p className="text-xxlarge">But you probably already know that.</p>
            <p className="text-xlarge">Anyway, this is to show you how cool web app today is.</p>
            <p className="text-xlarge">Have a nice day.</p>
            <a href="/" className="btn btn-primary">
              Reload
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OfflineMessage;
