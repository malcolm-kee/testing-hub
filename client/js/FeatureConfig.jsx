import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isURL } from 'validator';

import Header from './Header';
import FeatureConfigLink from './FeatureConfigLink';
import FeatureConfigLinkCreate from './FeatureConfigLinkCreate';

import featureService from './service/featureService';

class FeatureConfig extends Component {
	state = {
		id: this.props.id,
		name: this.props.name,
		requireLogin: this.props.requireLogin,
		links: this.props.links,
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
		const checkLinkUrl = link => isURL(link.url);

		this.setState({ error: '' });
		if (this.state.name.length === 0) {
			this.setState({ error: 'Please populate Name field' });
			return false;
		} else if (this.state.links.length === 0) {
			this.setState({ error: 'Please add at least a link' });
			return false;
		} else if (this.state.links.every(checkLinkUrl) === false) {
			this.setState({ error: 'Please use a valid URL.' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.validateForm()) {
			featureService
				.update({
					id: this.state.id,
					name: this.state.name,
					requireLogin: this.state.requireLogin,
					links: this.state.links
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
			.remove({ id: this.state.id })
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

	handleLinkInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const linkId = target.dataset.linkid;

		this.setState(prevState => {
			const latestLinks = prevState.links.map(link => {
				if (link.id === linkId) {
					const updatedLink = Object.assign({}, link, {
						[name]: value
					});

					return updatedLink;
				}
				return link;
			});

			return {
				links: latestLinks
			};
		});
	};

	handleLinkRemove = event => {
		event.preventDefault();

		const linkId = event.target.dataset.linkid;

		this.setState(prevState => {
			const latestLinks = prevState.links.filter(link => link.id !== linkId);

			return {
				links: latestLinks
			};
		});
	};

	addLink = link => {
		this.setState(prevState => {
			const latestLinks = prevState.links.concat(link);

			return {
				links: latestLinks
			};
		});
	};

	removeLink = id => {
		this.setState(prevState => {
			const latestLinks = prevState.links.filter(link => link.id !== id);

			return {
				links: latestLinks
			};
		});
	};

	updateLink = updatedLink => {
		this.setState(prevState => {
			const latestLinks = prevState.links.map(link => {
				if (link.id === updatedLink.id) {
					return updatedLink;
				}
				return link;
			});

			return {
				links: latestLinks
			};
		});
	};

	render() {
		let testLinks;
		let errorMessage;
		let removeBtn;

		if (this.state.links.length > 0) {
			testLinks = (
				<div>
					{this.state.links.map(featureLink => (
						<FeatureConfigLink
							key={featureLink.id}
							updatedLink={this.updatedLink}
							handleLinkRemove={this.handleLinkRemove}
							handleLinkInputChange={this.handleLinkInputChange}
							{...featureLink}
						/>
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
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
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
												name="requireLogin"
												className="form-control"
												checked={this.state.requireLogin}
												onChange={this.handleCheckBoxChange}
											/>
										</div>
									</div>
								</fieldset>
								<fieldset>
									<legend>Links</legend>
									{testLinks}
									<FeatureConfigLinkCreate addLink={this.addLink} />
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
									<button type="submit" className="btn btn-primary">
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

const mapStateToProps = state => ({ isAdmin: state.isAdmin });

FeatureConfig.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	requireLogin: PropTypes.bool.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			env: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired
		})
	).isRequired,
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	isAdmin: PropTypes.bool.isRequired,
	refreshFeatures: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withRouter(FeatureConfig));
