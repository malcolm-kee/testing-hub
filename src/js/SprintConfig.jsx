import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { PanelGroup } from 'react-bootstrap';
import copy from 'copy-to-clipboard';

import Header from './Header';
import SprintItemConfig from './SprintItemConfig';

import sprintData from './data/sprintData';

class SprintConfig extends Component {
	state = {
		id: '',
		name: '',
		url: '',
		desc: '',
		sprintItems: [],
		searchTerm: '',
		error: ''
	};

	componentDidMount() {
		sprintData
			.getOne({ id: this.props.sprint.id })
			.then(sprint => {
				this.setState(sprint);
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
		} else if (this.state.sprintItems.length === 0) {
			this.setState({ error: 'Please add at least a test link' });
			return false;
		}
		return true;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.validateForm()) {
			sprintData
				.update({
					id: this.state.id,
					name: this.state.name,
					url: this.state.url,
					desc: this.state.desc,
					sprintItems: this.state.sprintItems
				})
				.then(() => {
					this.props.refreshSprints();
					this.props.history.goBack();
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
		sprintData
			.remove({ id: this.state.id })
			.then(() => {
				this.props.refreshSprints();
				this.props.history.goBack();
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem delete this test sprint. Please try again.'
				});
			});
	};

	handleCopyUrl = event => {
		event.preventDefault();
		copy(`${window.location.origin}/sprint/${this.state.url}`, {
			message: 'URL copied!'
		});
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	addSprintItem = sprintItem => {
		this.setState(prevState => {
			const latestItems = prevState.sprintItems.concat(sprintItem);

			return {
				sprintItems: latestItems
			};
		});
	};

	removeSprintItem = id => {
		this.setState(prevState => {
			const latestItems = prevState.sprintItems.filter(sprintItem => sprintItem.id !== id);

			return {
				sprintItems: latestItems
			};
		});
	};

	render() {
		let sprintItemsSection;
		let errorMessage;

		if (this.state.sprintItems.length > 0) {
			sprintItemsSection = this.state.sprintItems.map(sprintItem => (
				<SprintItemConfig
					key={sprintItem.id}
					features={this.props.features}
					removeSprintItem={this.removeSprintItem}
					{...sprintItem}
				/>
			));
		} else {
			sprintItemsSection = (
				<div className="alert alert-danger">
					<p className="text-xlarge">No sprint item has been added.</p>
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

		return (
			<div>
				<Header back next nextAction={this.handleSubmit} backAction={this.props.history.goBack} />
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
												<span className="input-group-btn">
													<button className="btn btn-default" onClick={this.handleCopyUrl}>
														<span className="glyphicon glyphicon-copy text-large" />
													</button>
												</span>
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
									<legend>Sprint Items</legend>
									<PanelGroup>
										{sprintItemsSection}
										<SprintItemConfig
											new
											addSprintItem={this.addSprintItem}
											features={this.props.features}
										/>
									</PanelGroup>
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
