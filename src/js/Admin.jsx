import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

class Admin extends Component {
	state = {
		searchTerm: ''
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		let sprintList;
		let featureList;

		if (this.props.sprints.length > 0) {
			sprintList = this.props.sprints
				.filter(sprint => sprint.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(sprint => {
					const sprintUrl = `/sprint/${sprint.url}`;
					const editSprintUrl = `/sprint-config/${sprint.id}`;

					return (
						<div key={sprint.id} className="col-xs-12 col-sm-6 pad-vertical">
							<div className="panel panel-default" id={sprint.id}>
								<div className="panel-body">
									<h3 className="text-xxlarge">{sprint.name}</h3>
								</div>
								<div className="panel-footer">
									<div className="btn-group btn-group-justified">
										<Link to={editSprintUrl} className="btn btn-primary">
											<span className="glyphicon glyphicon-edit text-large" />
											<span className="hidden-xs text-xlarge">&nbsp;Edit</span>
										</Link>
										<Link to={sprintUrl} target="_blank" className="btn btn-primary">
											<span className="glyphicon glyphicon-new-window text-large" />
											<span className="hidden-xs text-xlarge">&nbsp;View</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					);
				});
		} else {
			sprintList = <Spinner />;
		}

		if (this.props.features.length > 0) {
			featureList = this.props.features
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(feature => (
					<div key={feature.id} className="col-xs-12 col-sm-6 pad-vertical">
						<Feature editMode {...feature} />
					</div>
				));
		} else {
			featureList = <Spinner />;
		}

		return (
			<div>
				<Header />
				<div className="container-fluid">
					<div className="row">
						<header className="page-header">
							<h1>Administration</h1>
						</header>
						<div className="container">
							<SearchBar
								handleSearchTermChange={this.handleSearchTermChange}
								searchTerm={this.state.searchTerm}
							/>
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-body">
										<div className="btn-toolbar">
											<div className="btn-group">
												<Link to="/feature-create" className="btn btn-success">
													<span className="glyphicon glyphicon-plus text-large" />
													&nbsp;<span className="text-xxlarge">
														<span className="hidden-xs">Add a new</span> link
													</span>
												</Link>
												<Link to="/sprint-create" className="btn btn-info">
													<span className="glyphicon glyphicon-plus text-large" />
													&nbsp;<span className="text-xxlarge">
														<span className="hidden-xs">Add a new</span> sprint
													</span>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-sm-6">
									<div className="panel panel-success">
										<div className="panel-heading">
											<h3 className="panel-title">Test links</h3>
										</div>
										<div className="panel-body">
											<div className="list-group">{featureList}</div>
										</div>
									</div>
								</div>
								<div className="col-xs-12 col-sm-6">
									<div className="panel panel-info">
										<div className="panel-heading">
											<h3 className="panel-title">Test sprints</h3>
										</div>
										<div className="panel-body">
											<div className="list-group">{sprintList}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Admin.propTypes = {
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
	sprints: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired
};

export default Admin;
