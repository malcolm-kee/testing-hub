import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Header from './Header';
import FeatureConfigLink from './FeatureConfigLink';

import featureService from './service/featureService';

class FeatureConfig extends Component {
	state = {
		featureId: this.props.feature.id,
		featureName: this.props.feature.name,
		featureRequireLogin: this.props.feature.requireLogin,
		featureLinks: this.props.feature.links,
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
		this.setState({ error: '' });
		if (this.state.featureName.length === 0) {
			this.setState({ error: 'Please populate Name field' });
			return false;
		} else if (this.state.featureLinks.length === 0) {
			this.setState({ error: 'Please add at least a link' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.validateForm()) {
			featureService
				.update({
					id: this.state.featureId,
					name: this.state.featureName,
					requireLogin: this.state.featureRequireLogin,
					links: this.state.featureLinks
				})
				.then(() => {
					this.props.history.goBack();
					this.props.refreshFeatures();
				})
				.catch(() => {
					this.setState({
						error: 'Sorry, we have problem saving your changes. Please try again.'
					});
				});
		}
	};

	handleDelete = event => {
		event.preventDefault();
		this.setState({ error: '' });
		featureService
			.remove({ id: this.state.featureId })
			.then(() => {
				this.props.history.goBack();
				this.props.refreshFeatures();
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem delete this test link. Please try again.'
				});
			});
	};

	addLink = link => {
		this.setState(prevState => {
			const latestFeatureLinks = prevState.featureLinks.concat(link);

			return {
				featureLinks: latestFeatureLinks
			};
		});
	};

	removeLink = id => {
		this.setState(prevState => {
			const latestFeatureLinks = prevState.featureLinks.filter(link => link.id !== id);

			return {
				featureLinks: latestFeatureLinks
			};
		});
	};

	render() {
		let testLinks;
		let errorMessage;
		let removeBtn;

		if (this.state.featureLinks.length > 0) {
			testLinks = (
				<div>
					{this.state.featureLinks.map(featureLink => (
						<FeatureConfigLink key={featureLink.id} removeLink={this.removeLink} {...featureLink} />
					))}
				</div>
			);
		}

		if (this.state.error.length > 0) {
			errorMessage = (
				<div className="alert alert-danger">
					<p className="text-xlarge">{this.state.error}</p>
				</div>
			);
		}

		if (this.props.isAdmin === true) {
			removeBtn = (
				<button type="button" className="btn btn-danger pull-right" onClick={this.handleDelete}>
					Delete&nbsp;
					<span className="glyphicon glyphicon-trash text-large" />
				</button>
			);
		}

		return (
			<div>
				<Header back next nextAction={this.handleSubmit} backAction={this.props.history.goBack} />
				<div className="container">
					<div className="row">
						<header className="page-header">
							<h1>Edit Test Link</h1>
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
												name="featureName"
												className="form-control"
												value={this.state.featureName}
												onChange={this.handleInputChange}
											/>
										</div>
									</div>
									<div className="form-group">
										<label
											htmlFor="feature-requireLogin"
											className="col-sm-2 col-form-label text-xxlarge"
										>
											Require Login
										</label>
										<div className="col-sm-10">
											<input
												type="checkbox"
												id="feature-requireLogin"
												name="featureRequireLogin"
												className="form-control"
												checked={this.state.featureRequireLogin}
												onChange={this.handleCheckBoxChange}
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
									<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
										Save changes&nbsp;
										<span className="glyphicon glyphicon-ok text-large" />
									</button>
									{removeBtn}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

FeatureConfig.propTypes = {
	feature: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		requireLogin: PropTypes.bool.isRequired,
		links: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired,
				env: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	loggedIn: PropTypes.bool.isRequired,
	isAdmin: PropTypes.bool.isRequired,
	refreshFeatures: PropTypes.func.isRequired
};

export default withRouter(FeatureConfig);
