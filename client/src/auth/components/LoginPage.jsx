import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors } from '../../reducers';
import { setLoginStatus } from './../../actions/auth';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { InitializeService } from '../../components/ajax/InitializeService';
import Header from './../../Header';
import LoginForm from './LoginForm';

import { login } from './../../service/authenticationService';

class LoginPageContainer extends Component {
  state = {
    error: '',
    message: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit = values => {
    const { initializeData } = this.props;

    login(values)
      .then(data => {
        this.setState({ message: 'Your have logged in successfully!' });
        initializeData().then(() => {
          this.props.loginUser({ userName: data.name, isAdmin: data.isAdmin });
        });
      })
      .catch(() => {
        this.setState({
          error: 'Unsuccessful login. Please recheck your email and password.'
        });
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
                <LoginForm onSubmit={this.handleSubmit} />
                <span>
                  Do not have an account? <Link to="/register">Sign Up here</Link>
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

const mapDispatchToProps = dispatch => ({
  loginUser({ userName, isAdmin }) {
    dispatch(setLoginStatus({ loggedIn: true, userName, isAdmin }));
  }
});

LoginPageContainer.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired, goBack: PropTypes.func.isRequired })
    .isRequired,
  loginUser: PropTypes.func.isRequired,
  initializeData: PropTypes.func.isRequired
};

LoginPageContainer.defaultProps = {
  loggedIn: false
};

const LoginPage = props => (
  <ErrorBoundary>
    <InitializeService
      render={({ triggerService }) => (
        <LoginPageContainer initializeData={triggerService} {...props} />
      )}
    />
  </ErrorBoundary>
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
