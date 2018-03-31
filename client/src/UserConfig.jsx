import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Header from './Header';
import { Spinner } from './Spinner';

import userService from './service/userService';

class UserConfig extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    verified: false,
    loaded: false,
    error: ''
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    userService
      .getOne({ id: params.id })
      .then(user => {
        this.setState(user);
        this.setState({ loaded: true });
      })
      .catch(() => {
        this.setState({ error: 'Sorry, we have problem getting the user.' });
      });
  }

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
      this.setState({ error: 'Name is required' });
      return false;
    } else if (this.state.email.length === 0) {
      this.setState({ error: 'Email is required' });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { match: { params } } = this.props;

    if (this.validateForm()) {
      userService
        .update({
          id: params.id,
          name: this.state.name,
          email: this.state.email,
          isAdmin: this.state.isAdmin,
          verified: this.state.verified,
          password: this.state.password
        })
        .then(() => {
          this.props.history.goBack();
        })
        .catch(error => {
          if (error.message) {
            this.setState({
              error: error.message
            });
          } else {
            this.setState({
              error: 'Sorry, unable to update user'
            });
          }
        });
    }
  };

  render() {
    let formContent;

    if (this.state.loaded) {
      let systemMessage;

      if (this.state.error.length > 0) {
        systemMessage = (
          <div className="alert alert-danger">
            <p className="text-xlarge">{this.state.error}</p>
          </div>
        );
      }

      formContent = (
        <form className="form-horizontal">
          {systemMessage}
          <fieldset>
            <legend>Details</legend>
            <div className="form-group">
              <label htmlFor="user-name" className="col-sm-2 col-form-label text-xxlarge">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="user-name"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="user-email" className="col-sm-2 col-form-label text-xxlarge">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="user-password" className="col-sm-2 col-form-label text-xxlarge">
                New Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  id="user-password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="user-isAdmin" className="col-sm-2 col-form-label text-xxlarge">
                Admin User
              </label>
              <div className="col-sm-10">
                <input
                  type="checkbox"
                  id="user-isAdmin"
                  name="isAdmin"
                  className="form-control"
                  checked={this.state.isAdmin}
                  onChange={this.handleCheckBoxChange}
                  disabled={this.state.isAdmin}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="user-verified" className="col-sm-2 col-form-label text-xxlarge">
                Email verified
              </label>
              <div className="col-sm-10">
                <input
                  type="checkbox"
                  id="user-verified"
                  name="verified"
                  className="form-control"
                  checked={this.state.verified}
                  onChange={this.handleCheckBoxChange}
                />
              </div>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-default" onClick={this.props.history.goBack}>
                <span className="glyphicon glyphicon-menu-left text-large" />
                Back
              </button>
              <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>
                Update user&nbsp;
                <span className="glyphicon glyphicon-ok text-large" />
              </button>
            </div>
          </fieldset>
        </form>
      );
    } else {
      formContent = <Spinner />;
    }
    return (
      <div>
        <Header back next nextAction={this.handleSubmit} backAction={this.props.history.goBack} />
        <div className="container">
          <div className="row">
            <header className="page-header">
              <h1>Modify user {this.state.name}</h1>
            </header>
            <div className="container">{formContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

UserConfig.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired
};

export default withRouter(UserConfig);
