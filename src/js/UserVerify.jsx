import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Spinner from './Spinner';

import authenticationService from './service/authenticationService';

class UserVerify extends Component {
	state = {
		loaded: false,
		message: ''
	};

	componentDidMount() {
		const code = this.props.code;
		authenticationService
			.verify({ code })
			.then(() => {
				this.setState({ loaded: true, message: "You've successfully verified your account!" });
				window.setTimeout(() => {
					this.props.refreshLoginStatus();
					this.props.history.push('/');
				}, 1500);
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

UserVerify.propTypes = {
	code: PropTypes.string.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	refreshLoginStatus: PropTypes.func.isRequired
};

export default withRouter(UserVerify);
