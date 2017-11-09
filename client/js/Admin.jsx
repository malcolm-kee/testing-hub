import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Feature from './Feature';
import User from './User';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

import userService from './service/userService';

class Admin extends Component {
	state = {
		searchTerm: '',
		users: []
	};

	componentWillMount() {
		if (this.props.loggedIn === false) {
			this.props.history.push('/login');
		} else if (this.props.isAdmin) {
			this.refreshUsers();
		}
	}

	refreshUsers = () => {
		userService
			.getAll()
			.then(users => {
				this.setState({ users });
			})
			.catch(() => {
				this.setState({ error: true });
				this.setState({ errorMessage: 'Error while getting users list' });
			});
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		let sprintList;
		let featureList;
		let userList;
		let addUserBtn;
		let userMgmtPanel;

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

		if (this.state.users.length > 0) {
			userList = this.state.users.map(user => <User key={user.id} {...user} />);
		} else {
			userList = <Spinner />;
		}

		if (this.props.isAdmin) {
			addUserBtn = (
				<Link to="/user-create" className="btn btn-warning">
					<span className="glyphicon glyphicon-plus text-large" />
					&nbsp;<span className="text-xxlarge">
						<span className="hidden-xs">Add a new</span> user
					</span>
				</Link>
			);
			userMgmtPanel = (
				<div className="panel panel-warning">
					<div className="panel-heading">
						<h3 className="panel-title">Users</h3>
					</div>
					<div className="panel-body">
						<div className="list-group">{userList}</div>
					</div>
				</div>
			);
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
												{addUserBtn}
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
									{userMgmtPanel}
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
	).isRequired,
	loggedIn: PropTypes.bool,
	isAdmin: PropTypes.bool,
	userName: PropTypes.string,
	refreshLoginStatus: PropTypes.func.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

Admin.defaultProps = {
	loggedIn: null,
	isAdmin: null,
	userName: ''
};

export default withRouter(Admin);
