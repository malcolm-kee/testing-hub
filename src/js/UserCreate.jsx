import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Header from './Header';

import userService from './service/userService';

class UserCreate extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		isAdmin: false,
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
			this.setState({ error: 'Name is required' });
			return false;
		} else if (this.state.email.length === 0) {
			this.setState({ error: 'Email is required' });
			return false;
		} else if (this.state.password.length === 0) {
			this.setState({ error: 'Password is required' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();

		if (this.validateForm()) {
			userService
				.create({
					name: this.state.name,
					email: this.state.email,
					isAdmin: this.state.isAdmin,
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
							error: 'Sorry, unable to create new user.'
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
		}

		return (
			<div>
				<Header back next nextAction={this.handleSubmit} backAction={this.props.history.goBack} />
				<div className="container">
					<div className="row">
						<header className="page-header">
							<h1>Create a New User</h1>
						</header>
						<div className="container">
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
											Password
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
											/>
										</div>
									</div>
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
											Create user&nbsp;
											<span className="glyphicon glyphicon-ok text-large" />
										</button>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

UserCreate.propTypes = {
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired
};

export default withRouter(UserCreate);
