import React, { Component } from 'react';

import Header from './../../Header';
import RegisterForm from './RegisterForm';

import authenticationService from './../../service/authenticationService';

class RegisterPage extends Component {
	state = {
		error: '',
		message: ''
	};

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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;
