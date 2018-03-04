import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors } from '../../reducers';
import Header from './../../Header';
import RegisterForm from './RegisterForm';

import authenticationService from './../../service/authenticationService';

class RegisterPage extends Component {
  state = {
    error: '',
    message: ''
  };

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit = values => {
    authenticationService
      .register(values)
      .then(() => {
        this.setState({ message: `A verification email has been sent to ${this.state.email}` });
      })
      .catch(error => {
        if (error.message) {
          this.setState({
            error: error.message
          });
        } else {
          this.setState({
            error: "Sorry, we've problem registering your account. Please try again later."
          });
        }
      });
  };

  render() {
    let systemMessage;

    if (this.state.error.length > 0) {
      systemMessage = (
        <div className="alert alert-danger">
          <p className="text-xlarge">{this.state.error}</p>
        </div>
      );
    } else if (this.state.message.length > 0) {
      systemMessage = (
        <div className="alert alert-success">
          <p className="text-xlarge">{this.state.message}</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="user-auth-form panel">
                {systemMessage}
                <RegisterForm onSubmit={this.handleSubmit} />
                <span>
                  Already registered? <Link to="/login">Login here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: selectors.getLoginState(state) });

RegisterPage.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

RegisterPage.defaultProps = {
  loggedIn: false
};

export default withRouter(connect(mapStateToProps, null)(RegisterPage));
