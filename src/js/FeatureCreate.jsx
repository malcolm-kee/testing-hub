import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Header from './Header';
import FeatureConfigLink from './FeatureConfigLink';
import featureData from './data/featureData';

class FeatureCreate extends Component {
	state = {
		name: '',
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
		this.setState({ error: '' });
		if (this.validateForm()) {
			featureData
				.create({
					name: this.state.name,
					links: this.state.links
				})
				.then(() => {
					this.props.refreshFeatures();
					this.props.history.goBack();
				})
				.catch(() => {
					this.setState({
						error: 'Sorry, we have problem add your test link. Please try again.'
					});
				});
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
								</fieldset>
								<fieldset>
									<legend>Links</legend>
									{testLinks}
									<FeatureConfigLink new addLink={this.addLink} />
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

FeatureCreate.propTypes = {
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	refreshFeatures: PropTypes.func.isRequired
};

export default withRouter(FeatureCreate);
