import React, { Component } from 'react';

import Header from './Header';

import authenticationService from './service/authenticationService';

class Register extends Component {
	state = {
		name: '',
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
		if (this.state.name.length === 0) {
			this.setState({ error: 'Please tell us your name' });
			return false;
		} else if (this.state.email.length === 0) {
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
				.register({
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				})
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
								<form className=" form-horizontal">
									{systemMessage}
									<fieldset>
										<legend>Sign Up</legend>
										<div className="form-group">
											<label htmlFor="register-name" className="col-form-label text-xxlarge">
												Name
											</label>
											<input
												type="text"
												id="register-name"
												name="name"
												className="form-control"
												value={this.state.name}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="register-email" className="col-form-label text-xxlarge">
												Email
											</label>
											<input
												type="email"
												id="register-email"
												name="email"
												className="form-control"
												placeholder="@accenture.com OR @digi.com"
												value={this.state.email}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="register-password" className="col-form-label text-xxlarge">
												Password
											</label>
											<input
												type="password"
												id="register-password"
												name="password"
												className="form-control"
												value={this.state.password}
												onChange={this.handleInputChange}
											/>
										</div>
									</fieldset>
									<div className="btn-toolbar">
										<div className="btn-group pull-right">
											<button
												type="button"
												className="btn btn-primary"
												onClick={this.handleSubmit}
											>
												Sign Up
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

export default Register;
