import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import SprintSummary from './SprintSummary';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import DotsLoader from './DotsLoader';
import SprintItemCardView from './SprintItemCardView';
import SprintItemTableView from './SprintItemTableView';

import sprintService from './service/sprintService';

class Sprint extends Component {
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
		sprintService
			.getOne({ url: this.props.url })
			.then(sprint => {
				this.setState(sprint);
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem getting your sprint page.'
				});
			});
	}

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	handleSprintItemStatusSelect = (eventKey, event) => {
		event.preventDefault();

		const status = eventKey;
		const itemId = event.target.dataset.itemid;

		sprintService
			.updateItemStatus({ id: this.state.id, itemId, status })
			.then(sprint => {
				this.setState(sprint);
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
		} else if (this.props.features.length > 0 && this.state.sprintItems.length > 0) {
			header = (
				<header className="page-header">
					<h1>{this.state.name}</h1>
					<p>{this.state.desc}</p>
				</header>
			);

			const filteredSprintItems = this.state.sprintItems
				.map(sprintItem => {
					const itemFeature = this.props.features.find(
						feature => feature.id === sprintItem.featureId
					);
					return Object.assign(sprintItem, { feature: itemFeature });
				})
				.filter(
					sprintItem =>
						`${sprintItem.name} ${sprintItem.desc} ${sprintItem.feature.name}`
							.toUpperCase()
							.indexOf(this.state.searchTerm.toUpperCase()) >= 0
				);

			content = (
				<Tabs defaultActiveKey={1} bsStyle="pills">
					<Tab eventKey={1} title="Card View">
						<SprintItemCardView
							sprintItems={filteredSprintItems}
							loggedIn={this.props.loggedIn}
							handleSprintItemStatusSelect={
								this.handleSprintItemStatusSelect
							}
						/>
					</Tab>
					<Tab eventKey={2} title="Table View">
						<SprintItemTableView
							sprintItems={filteredSprintItems}
							loggedIn={this.props.loggedIn}
							handleSprintItemStatusSelect={
								this.handleSprintItemStatusSelect
							}
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
							<SprintSummary sprintItems={this.state.sprintItems} />
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

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

Sprint.propTypes = {
	url: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
		.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Sprint);
