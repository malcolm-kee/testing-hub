import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { setLoginStatus } from './actionCreators';

import Header from './Header';

import authenticationService from './service/authenticationService';

class Login extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		message: ''
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	validateForm = () => {
		this.setState({ error: '' });
		if (this.state.email.length === 0) {
			this.setState({ error: 'Please provide your email' });
			return false;
		} else if (this.state.password.length === 0) {
			this.setState({ error: 'Please provide your password' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.validateForm()) {
			authenticationService
				.login({
					email: this.state.email,
					password: this.state.password
				})
				.then(data => {
					this.setState({ message: 'Your have logged in successfully!' });
					window.setTimeout(() => {
						this.props.loginUser({ userName: data.name, isAdmin: data.isAdmin });
						this.props.history.goBack();
					}, 1500);
				})
				.catch(() => {
					this.setState({
						error: 'Unsuccessful login. Please recheck your email and password.'
					});
				});
		}
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
								<form className=" form-horizontal" onSubmit={this.handleSubmit}>
									{systemMessage}
									<fieldset>
										<legend>Login</legend>
										<div className="form-group">
											<label htmlFor="login-email" className="col-form-label text-xxlarge">
												Email
											</label>
											<input
												type="email"
												id="login-email"
												name="email"
												className="form-control"
												value={this.state.email}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="login-password" className="col-form-label text-xxlarge">
												Password
											</label>
											<input
												type="password"
												id="login-password"
												name="password"
												className="form-control"
												value={this.state.password}
												onChange={this.handleInputChange}
											/>
										</div>
									</fieldset>
									<div className="btn-toolbar">
										<div className="btn-group pull-right">
											<button type="submit" className="btn btn-primary">
												Login
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	loginUser({ userName, isAdmin }) {
		dispatch(setLoginStatus({ loggedIn: true, userName, isAdmin }));
	}
});

Login.propTypes = {
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	loginUser: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
