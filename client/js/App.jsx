import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import preload from './data.json';
import Landing from './Landing';
import Catalog from './Catalog';
import Admin from './Admin';
import FeatureCreate from './FeatureCreate';
import FeatureConfig from './FeatureConfig';
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

class App extends Component {
	state = {
		features: [],
		sprints: [],
		loggedIn: false,
		isAdmin: false,
		userName: '',
		error: false,
		errorMessage: null
	};

	componentWillMount() {
		this.refreshLoginStatus();
		this.refreshSprints();
	}

	refreshFeatures = () => {
		if (this.state.loggedIn) {
			featureService
				.getAll()
				.then(features => {
					this.setState({ features });
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
		Promise.all([authenticationService.getLoginStatus(), authenticationService.getCurrentUser()]).then(data => {
			const loggedIn = data[0];
			const currentUser = data[1];
			this.setState(
				{
					loggedIn,
					userName: currentUser.name,
					isAdmin: currentUser.isAdmin
				},
				() => {
					this.refreshFeatures();
				}
			);
		});

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route
							exact
							path="/"
							component={() => (
								<Catalog
									features={this.state.features}
									sprints={this.state.sprints}
									loggedIn={this.state.loggedIn}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							exact
							path="/landing"
							component={() => (
								<Landing
									loggedIn={this.state.loggedIn}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							exact
							path="/login"
							component={() => (
								<Login loggedIn={this.state.loggedIn} refreshLoginStatus={this.refreshLoginStatus} />
							)}
						/>
						<Route exact path="/register" component={Register} />
						<Route
							path="/verify-account/:code"
							component={props => (
								<UserVerify
									code={props.match.params.code}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							exact
							path="/user-create"
							component={() => <UserCreate loggedIn={this.state.loggedIn} />}
						/>
						<Route path="/user-config/:id" component={props => <UserConfig id={props.match.params.id} />} />
						<Route
							exact
							path="/admin"
							component={() => (
								<Admin
									features={this.state.features}
									sprints={this.state.sprints}
									loggedIn={this.state.loggedIn}
									isAdmin={this.state.isAdmin}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							exact
							path="/feature-create"
							component={() => (
								<FeatureCreate
									refreshFeatures={this.refreshFeatures}
									loggedIn={this.state.loggedIn}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							path="/feature-config/:id"
							component={props => {
								const selectedFeature = this.state.features.find(
									feature => props.match.params.id === feature.id
								);
								return (
									<FeatureConfig
										refreshFeatures={this.refreshFeatures}
										loggedIn={this.state.loggedIn}
										isAdmin={this.state.isAdmin}
										userName={this.state.userName}
										refreshLoginStatus={this.refreshLoginStatus}
										{...selectedFeature}
									/>
								);
							}}
						/>
						<Route
							path="/sprint/:url"
							component={props => (
								<Sprint
									url={props.match.params.url}
									features={this.state.features}
									refreshSprints={this.refreshSprints}
									loggedIn={this.state.loggedIn}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							exact
							path="/sprint-create"
							component={() => (
								<SprintCreate
									refreshSprints={this.refreshSprints}
									features={this.state.features}
									loggedIn={this.state.loggedIn}
									userName={this.state.userName}
									refreshLoginStatus={this.refreshLoginStatus}
								/>
							)}
						/>
						<Route
							path="/sprint-config/:id"
							component={props => {
								const selectedSprint = this.state.sprints.find(
									sprint => props.match.params.id === sprint.id
								);
								return (
									<SprintConfig
										sprint={selectedSprint}
										refreshSprints={this.refreshSprints}
										features={this.state.features}
										loggedIn={this.state.loggedIn}
										isAdmin={this.state.isAdmin}
										userName={this.state.userName}
										refreshLoginStatus={this.refreshLoginStatus}
									/>
								);
							}}
						/>
						<Route component={PageNotFoundMessage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;
