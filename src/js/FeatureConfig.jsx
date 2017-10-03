import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from 'axios';

import Header from './Header';
import FeatureConfigLink from './FeatureConfigLink';

class FeatureConfig extends Component {
	state = {
		featureId: this.props.feature.id,
		featureName: this.props.feature.name,
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

	handleSubmit = event => {
		event.preventDefault();
		this.setState({ error: '' });
		axios
			.put(`/api/feature/id/${this.state.featureId}`, {
				id: this.state.featureId,
				name: this.state.featureName,
				links: this.state.featureLinks
			})
			.then(response => {
				if (response.status === 200) {
					this.props.history.goBack();
					this.props.refreshFeatures();
				}
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem saving your changes. Please try again.'
				});
			});
	};

	handleDelete = event => {
		event.preventDefault();
		this.setState({ error: '' });
		axios
			.delete(`/api/feature/id/${this.state.featureId}`)
			.then(response => {
				if (response.status === 200) {
					this.props.history.goBack();
					this.props.refreshFeatures();
				}
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

	removeLink = env => {
		this.setState(prevState => {
			const latestFeatureLinks = prevState.featureLinks.filter(link => link.env !== env);

			return {
				featureLinks: latestFeatureLinks
			};
		});
	};

	render() {
		let testLinks;
		let errorMessage;

		if (this.state.featureLinks.length > 0) {
			testLinks = (
				<div>
					{this.state.featureLinks.map(featureLink => (
						<FeatureConfigLink removeLink={this.removeLink} {...featureLink} />
					))}
				</div>
			);
		} else {
			testLinks = <pre>No links!</pre>;
		}

		if (this.state.error.length > 0) {
			errorMessage = (
				<div className="alert alert-danger">
					<p className="text-xlarge">{this.state.error}</p>
				</div>
			);
		}

		return (
			<div>
				<Header />
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
										<label htmlFor="feature-id" className="col-sm-2 col-form-label text-xxlarge">
											Id
										</label>
										<div className="col-sm-10">
											<input
												type="text"
												id="feature-id"
												name="featureId"
												className="form-control"
												readOnly
												value={this.state.featureId}
											/>
											<small className="form-text">This is a system generated value.</small>
										</div>
									</div>
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
									<button
										type="submit"
										className="btn btn-danger pull-right"
										onClick={this.handleDelete}
									>
										Delete&nbsp;
										<span className="glyphicon glyphicon-trash text-large" />
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

FeatureConfig.propTypes = {
	feature: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		links: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired,
				env: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	refreshFeatures: PropTypes.func.isRequired
};

export default withRouter(FeatureConfig);