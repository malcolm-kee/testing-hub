import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from 'axios';

import Header from './Header';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import SprintFeature from './SprintFeature';

class SprintConfig extends Component {
	state = {
		id: '',
		name: '',
		url: '',
		desc: '',
		features: [],
		searchTerm: '',
		error: ''
	};

	componentDidMount() {
		axios
			.get(`/api/sprint/id/${this.props.sprint.id}`)
			.then(response => {
				this.setState(response.data.sprints[0]);
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem getting your test sprint. Please try again.'
				});
			});
	}

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
			this.setState({ error: 'Name is required' });
			return false;
		} else if (/^\w+$/.test(this.state.url) === false) {
			this.setState({ error: 'Url must consists of letters, numbers and underscore (_) only.' });
			return false;
		} else if (this.state.features.length === 0) {
			this.setState({ error: 'Please add at least a test link' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.validateForm()) {
			axios
				.put(`/api/sprint/id/${this.state.id}`, {
					name: this.state.name,
					url: this.state.url,
					desc: this.state.desc,
					features: this.state.features
				})
				.then(response => {
					if (response.status === 200) {
						this.props.refreshSprints();
						this.props.history.goBack();
					}
				})
				.catch(() => {
					this.setState({
						error: 'Sorry, we have problem update your test sprint. Please try again.'
					});
				});
		}
	};

	handleDelete = event => {
		event.preventDefault();
		this.setState({ error: '' });
		axios
			.delete(`/api/sprint/id/${this.state.id}`)
			.then(response => {
				if (response.status === 200) {
					this.props.refreshSprints();
					this.props.history.goBack();
				}
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem delete this test sprint. Please try again.'
				});
			});
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	addSprintFeature = sprintFeature => {
		this.setState(prevState => {
			const latestFeatures = prevState.features.concat(sprintFeature);

			return {
				features: latestFeatures
			};
		});
	};

	removeSprintFeature = id => {
		this.setState(prevState => {
			const latestFeatures = prevState.features.filter(sprintFeature => sprintFeature.featureId !== id);

			return {
				features: latestFeatures
			};
		});
	};

	render() {
		let linkSection;
		let addedLinkSection;
		let errorMessage;

		if (Array.isArray(this.props.features) && this.props.features.length > 0) {
			linkSection = this.props.features
				.filter(feature => this.state.features.every(sprintFeature => sprintFeature.featureId !== feature.id))
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(feature => (
					<SprintFeature key={feature.id} addSprintFeature={this.addSprintFeature} {...feature} />
				));

			addedLinkSection = this.props.features
				.filter(feature => this.state.features.some(sprintFeature => sprintFeature.featureId === feature.id))
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(feature => (
					<SprintFeature added key={feature.id} removeSprintFeature={this.removeSprintFeature} {...feature} />
				));
		} else {
			linkSection = <Spinner />;
			addedLinkSection = <Spinner />;
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
							<h1>Edit Test Sprint</h1>
						</header>
						<div className="container">
							<form className="form-horizontal">
								{errorMessage}
								<fieldset>
									<legend>Details</legend>
									<div className="form-group">
										<label htmlFor="sprint-name" className="col-sm-2 col-form-label text-xxlarge">
											Name
										</label>
										<div className="col-sm-10">
											<input
												type="text"
												id="sprint-name"
												name="name"
												className="form-control"
												value={this.state.name}
												onChange={this.handleInputChange}
											/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="sprint-url" className="col-sm-2 col-form-label text-xxlarge">
											URL
										</label>
										<div className="col-sm-10">
											<div className="input-group">
												<span className="input-group-addon">{`${window.location
													.origin}/sprint/`}</span>
												<input
													type="text"
													id="sprint-url"
													name="url"
													className="form-control"
													value={this.state.url}
													onChange={this.handleInputChange}
												/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="sprint-desc" className="col-sm-2 col-form-label text-xxlarge">
											Description
										</label>
										<div className="col-sm-10">
											<textarea
												row="3"
												id="sprint-desc"
												name="desc"
												className="form-control"
												value={this.state.desc}
												onChange={this.handleInputChange}
											/>
										</div>
									</div>
								</fieldset>
								<fieldset>
									<legend>Links</legend>
									<SearchBar
										handleSearchTermChange={this.handleSearchTermChange}
										searchTerm={this.state.searchTerm}
									/>
									<div className="row">
										<div className="col-xs-12 col-sm-6">
											<div className="panel panel-primary">
												<div className="panel-heading">
													<h3 className="panel-title">Available links</h3>
												</div>
												<div className="panel-body">
													<div className="list-group">{linkSection}</div>
												</div>
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="panel panel-success">
												<div className="panel-heading">
													<div className="row panel-title">
														<div className="col-xs-12 col-sm-8">
															<h3 className="panel-title">Added links</h3>
														</div>
														<div className="col-xs-12 col-sm-4 text-xlarge text-right">
															{this.state.features.length} link(s) added
														</div>
													</div>
												</div>
												<div className="panel-body">
													<div className="list-group">{addedLinkSection}</div>
												</div>
											</div>
										</div>
									</div>
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
										Save changes&nbsp;
										<span className="glyphicon glyphicon-ok text-large" />
									</button>
									<button
										type="button"
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

SprintConfig.propTypes = {
	history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
	sprint: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired,
	refreshSprints: PropTypes.func.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }))
		.isRequired
};

export default withRouter(SprintConfig);
