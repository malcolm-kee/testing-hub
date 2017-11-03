import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SprintItem from './SprintItem';
import SprintSummary from './SprintSummary';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import DotsLoader from './DotsLoader';

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

	updateSprintItemStatus = (itemId, status) => {
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

			content = this.state.sprintItems
				.filter(sprintItem => {
					const itemFeature = this.props.features.find(feature => feature.id === sprintItem.featureId);

					return (
						`${sprintItem.name} ${sprintItem.desc} ${itemFeature.name}`
							.toUpperCase()
							.indexOf(this.state.searchTerm.toUpperCase()) >= 0
					);
				})
				.map(sprintItem => {
					const itemFeature = this.props.features.find(feature => feature.id === sprintItem.featureId);
					return (
						<div key={sprintItem.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 pad-vertical">
							<SprintItem
								feature={itemFeature}
								updateSprintItemStatus={this.updateSprintItemStatus}
								editable={this.props.loggedIn}
								{...sprintItem}
							/>
						</div>
					);
				});
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
				<Header
					showLogin
					loggedIn={this.props.loggedIn}
					userName={this.props.userName}
					refreshLoginStatus={this.props.refreshLoginStatus}
				/>
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

Sprint.propTypes = {
	url: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
	loggedIn: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	refreshLoginStatus: PropTypes.func.isRequired
};

export default Sprint;
