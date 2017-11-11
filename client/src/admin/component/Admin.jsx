import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from './../../Header';
import SearchBar from './../../SearchBar';
import AdminView from './AdminView';
import FeatureCreate from './FeatureCreate';
import FeatureConfig from './FeatureConfig';
import SprintCreate from './SprintCreate';
import SprintConfig from './SprintConfig';

import userService from './../../service/userService';

class Admin extends Component {
	state = {
		searchTerm: '',
		users: null
	};

	componentWillMount() {
		if (this.props.loggedIn === false) {
			this.props.history.push('/login');
		} else if (this.props.isAdmin) {
			this.refreshUsers();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.loggedIn && nextProps.loggedIn === true) {
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
		const sprintList = this.props.sprints.filter(
			sprint => sprint.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
		);
		const featureList = this.props.features.filter(
			feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
		);
		const AdminOverview = () => (
			<div>
				<Header showLogin />
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
							<AdminView
								features={featureList}
								sprints={sprintList}
								users={this.state.users}
								isAdmin={this.props.isAdmin}
							/>
						</div>
					</div>
				</div>
			</div>
		);

		return (
			<Switch>
				<Route exact path="/admin" component={AdminOverview} />
				<Route exact path="/admin/feature-create" component={FeatureCreate} />
				<Route path="/admin/feature-config/:id" component={FeatureConfig} />
				<Route exact path="/admin/sprint-create" component={SprintCreate} />
				<Route path="/admin/sprint-config/:id" component={SprintConfig} />
			</Switch>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.user.loggedIn,
	isAdmin: state.user.isAdmin,
	features: state.features,
	sprints: state.sprints
});

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
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

Admin.defaultProps = {
	loggedIn: null,
	isAdmin: null
};

export default withRouter(connect(mapStateToProps)(Admin));
