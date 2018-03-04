import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { creatingFeature } from './../../actions/feature';

import Header from './../../Header';
import FeatureConfigLink from './FeatureConfigLink';
import FeatureConfigLinkCreate from './FeatureConfigLinkCreate';

class FeatureCreate extends Component {
  state = {
    name: '',
    requireLogin: false,
    links: [],
    error: ''
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleCheckBoxChange = event => {
    const target = event.target;
    const name = target.name;
    const checked = target.checked;

    this.setState({
      [name]: checked
    });
  };

  validateForm = () => {
    if (this.state.name.length === 0) {
      this.setState({ error: 'Please populate Name field' });
      return false;
    } else if (this.state.links.length === 0) {
      this.setState({ error: 'Please add at least a link' });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { invokeCreateFeature, history } = this.props;

    this.setState({ error: '' });
    if (this.validateForm()) {
      const feature = {
        name: this.state.name,
        requireLogin: this.state.requireLogin,
        links: this.state.links
      };
      invokeCreateFeature({ feature });
      history.goBack();
    }
  };

  addLink = link => {
    this.setState(prevState => {
      const latestLinks = prevState.links.concat(link);

      return {
        links: latestLinks
      };
    });
  };

  removeLink = env => {
    this.setState(prevState => {
      const latestLinks = prevState.links.filter(link => link.env !== env);

      return {
        links: latestLinks
      };
    });
  };

  render() {
    let testLinks;
    let errorMessage;

    if (this.state.links.length > 0) {
      testLinks = (
        <div>
          {this.state.links.map(link => (
            <FeatureConfigLink key={link.id} removeLink={this.removeLink} {...link} />
          ))}
        </div>
      );
    }

    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          <p className="text-xlarge">{this.state.error}</p>
        </div>
      );
    }

    return (
      <div>
        <Header back next nextAction={this.handleSubmit} backAction={this.props.history.goBack} />
        <div className="container">
          <div className="row">
            <header className="page-header">
              <h1>Create New Test Link</h1>
            </header>
            <div className="container">
              <form className="form-horizontal">
                {errorMessage}
                <fieldset>
                  <legend>Details</legend>
                  <div className="form-group">
                    <label htmlFor="feature-name" className="col-sm-2 col-form-label text-xxlarge">
                      Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        id="feature-name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="feature-requireLogin"
                      className="col-sm-2 col-form-label text-xxlarge"
                    >
                      Require Login
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="checkbox"
                        id="feature-requireLogin"
                        name="requireLogin"
                        className="form-control"
                        checked={this.state.requireLogin}
                        onChange={this.handleCheckBoxChange}
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Links</legend>
                  {testLinks}
                  <FeatureConfigLinkCreate addLink={this.addLink} />
                </fieldset>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.props.history.goBack}
                  >
                    <span className="glyphicon glyphicon-menu-left text-large" />
                    Back
                  </button>
                  <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>
                    Create link&nbsp;
                    <span className="glyphicon glyphicon-ok text-large" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  invokeCreateFeature({ feature }) {
    dispatch(creatingFeature(feature));
  }
});

FeatureCreate.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
  invokeCreateFeature: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(FeatureCreate));
