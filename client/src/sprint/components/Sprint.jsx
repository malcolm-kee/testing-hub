import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import { updateSprint } from './../../sprintActionCreators';

import SprintSummary from './SprintSummary';
import Header from './../../Header';
import SearchBar from './../../SearchBar';
import Spinner from './../../Spinner';
import DotsLoader from './../../DotsLoader';
import SprintItemCardView from './SprintItemCardView';
import SprintItemTableView from './SprintItemTableView';

import sprintService from './../../service/sprintService';

class Sprint extends Component {
	state = {
		searchTerm: '',
		error: ''
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	handleSprintItemStatusSelect = (eventKey, event) => {
		event.preventDefault();

		const status = eventKey;
		const itemId = event.target.dataset.itemid;
		const sprintId = this.props.sprints.find(sprint => sprint.url === this.props.url).id;

		sprintService
			.updateItemStatus({ id: sprintId, itemId, status })
			.then(sprint => {
				this.props.invokeUpdateSprint({ sprint });
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem updating status.'
				});
			});
	};

	render() {
		let content;
		let header;
		let progressBar;
		const thisSprintRaw = this.props.sprints.find(sprint => sprint.url === this.props.url);

		if (this.state.error) {
			header = (
				<header className="page-header">
					<h1>Error</h1>
				</header>
			);
			content = (
				<div className="alert alert-danger">
					<p className="text-xlarge">{this.state.error}</p>
				</div>
			);
		} else if (
			this.props.features &&
			this.props.features.length > 0 &&
			thisSprintRaw.sprintItems &&
			thisSprintRaw.sprintItems.length > 0
		) {
			const thisSprint = Object.assign({}, thisSprintRaw, {
				sprintItems: thisSprintRaw.sprintItems.map(sprintItem =>
					Object.assign({}, sprintItem, {
						feature: this.props.features.find(feature => feature.id === sprintItem.featureId)
					})
				)
			});

			const filteredSprintItems = thisSprint.sprintItems.filter(
				sprintItem =>
					`${sprintItem.name} ${sprintItem.desc} ${sprintItem.feature.name}`
						.toUpperCase()
						.indexOf(this.state.searchTerm.toUpperCase()) >= 0
			);

			header = (
				<header className="page-header">
					<h1>{thisSprint.name}</h1>
					<p>{thisSprint.desc}</p>
				</header>
			);

			progressBar = <SprintSummary sprintItems={thisSprint.sprintItems} />;

			content = (
				<Tabs defaultActiveKey={1} bsStyle="pills">
					<Tab eventKey={1} title="Card View">
						<SprintItemCardView
							sprintItems={filteredSprintItems}
							loggedIn={this.props.loggedIn}
							handleSprintItemStatusSelect={this.handleSprintItemStatusSelect}
						/>
					</Tab>
					<Tab eventKey={2} title="Table View">
						<SprintItemTableView
							sprintItems={filteredSprintItems}
							loggedIn={this.props.loggedIn}
							handleSprintItemStatusSelect={this.handleSprintItemStatusSelect}
						/>
					</Tab>
				</Tabs>
			);
		} else {
			header = (
				<header className="page-header">
					<h1>Loading Sprint...</h1>
					<p>
						<DotsLoader />
					</p>
				</header>
			);
			content = <Spinner />;
		}

		return (
			<div>
				<Header showLogin />
				<div className="container-fluid">
					<div className="row">
						{header}
						<div className="container">
							{progressBar}
							<SearchBar
								handleSearchTermChange={this.handleSearchTermChange}
								searchTerm={this.state.searchTerm}
							/>
							<div className="row">
								<div className="col-sm-12 col-xs-12">{content}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn, features: state.features, sprints: state.sprints });

const mapDispatchToProps = dispatch => ({
	invokeUpdateSprint({ sprint }) {
		dispatch(updateSprint({ sprint }));
	}
});

Sprint.propTypes = {
	url: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
	sprints: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			sprintItems: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					scenarioId: PropTypes.string,
					name: PropTypes.string.isRequired
				})
			).isRequired
		})
	).isRequired,
	loggedIn: PropTypes.bool.isRequired,
	invokeUpdateSprint: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
