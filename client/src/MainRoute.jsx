import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginStatus } from './actionCreators';
import { setFeatures } from './featureActionCreators';
// import preload from './data.json';

import Landing from './Landing';
import Catalog from './Catalog';
import Admin from './admin/component/Admin';
import Sprint from './Sprint';
import SprintCreate from './SprintCreate';
import SprintConfig from './SprintConfig';
import Login from './Login';
import Register from './Register';
import UserCreate from './UserCreate';
import UserConfig from './UserConfig';
import UserVerify from './UserVerify';
// import ErrorMessage from './ErrorMessage';
import PageNotFoundMessage from './PageNotFoundMessage';

import featureService from './service/featureService';
import sprintService from './service/sprintService';
import authenticationService from './service/authenticationService';

class MainRoute extends Component {
	state = {
		features: [],
		sprints: [],
		error: false,
		errorMessage: null
	};

	componentWillMount() {
		this.refreshLoginStatus();
		this.refreshSprints();
	}

	refreshFeatures = () => {
		if (this.props.loggedIn) {
			featureService
				.getAll()
				.then(features => {
					this.setState({ features });
					this.props.initializeFeatures({ features });
				})
				.catch(() => {
					this.setState({ error: true });
					this.setState({ errorMessage: 'Error while getting features data' });
				});
		} else {
			featureService
				.getPublic()
				.then(features => {
					this.setState({ features });
				})
				.catch(() => {
					this.setState({ error: true });
					this.setState({ errorMessage: 'Error while getting features data' });
				});
		}
	};

	refreshSprints = () => {
		sprintService
			.getAll()
			.then(sprints => {
				this.setState({ sprints });
			})
			.catch(() => {
				this.setState({ error: true });
				this.setState({ errorMessage: 'Error while getting sprints data' });
			});
	};

	refreshLoginStatus = () =>
		Promise.all([authenticationService.getLoginStatus(), authenticationService.getCurrentUser()])
			.then(data => {
				const loggedIn = data[0];
				const currentUser = data[1];
				this.props.updateLoginStatus({ loggedIn, userName: currentUser.name, isAdmin: currentUser.isAdmin });

				this.refreshFeatures();
			})
			.catch(() => {
				this.props.updateLoginStatus(false);
			});

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route exact path="/" component={() => <Catalog sprints={this.state.sprints} />} />
						<Route exact path="/landing" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route
							path="/verify-account/:code"
							component={props => <UserVerify code={props.match.params.code} />}
						/>
						<Route exact path="/user-create" component={UserCreate} />
						<Route path="/user-config/:id" component={props => <UserConfig id={props.match.params.id} />} />
						<Route path="/admin" component={() => <Admin sprints={this.state.sprints} />} />
						<Route path="/sprint/:url" component={props => <Sprint url={props.match.params.url} />} />
						<Route
							exact
							path="/sprint-create"
							component={() => <SprintCreate refreshSprints={this.refreshSprints} />}
						/>
						<Route
							path="/sprint-config/:id"
							component={props => {
								const selectedSprint = this.state.sprints.find(
									sprint => props.match.params.id === sprint.id
								);
								return <SprintConfig sprint={selectedSprint} refreshSprints={this.refreshSprints} />;
							}}
						/>
						<Route component={PageNotFoundMessage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn });

const mapDispatchToProps = dispatch => ({
	updateLoginStatus({ loggedIn, userName, isAdmin }) {
		dispatch(setLoginStatus({ loggedIn, userName, isAdmin }));
	},
	initializeFeatures({ features }) {
		dispatch(setFeatures({ features }));
	}
});

MainRoute.propTypes = {
	loggedIn: PropTypes.bool,
	updateLoginStatus: PropTypes.func.isRequired,
	initializeFeatures: PropTypes.func.isRequired
};

MainRoute.defaultProps = {
	loggedIn: null
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
