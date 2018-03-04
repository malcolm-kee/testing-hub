import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { setLoginStatus } from './actions/auth';

import Spinner from './Spinner';

import { verify } from './service/authenticationService';

class UserVerify extends Component {
  state = {
    loaded: false,
    message: ''
  };

  componentDidMount() {
    const code = this.props.code;
    verify({ code })
      .then(data => {
        this.setState({ loaded: true, message: "You've successfully verified your account!" });
        this.props.loginUser({ userName: data.name, isAdmin: data.isAdmin });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loaded: true, message: 'Sorry, the verification is no longer valid.' });
      });
  }

  render() {
    let content;

    if (this.state.loaded === false) {
      content = <Spinner />;
    } else {
      content = <p>{this.state.message}</p>;
    }

    return content;
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser({ userName, isAdmin }) {
    dispatch(setLoginStatus({ loggedIn: true, userName, isAdmin }));
  }
});

UserVerify.propTypes = {
  code: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  loginUser: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withRouter(UserVerify));
