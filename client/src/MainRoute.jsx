import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginStatus } from './actionCreators';
import { getFeaturesFromApi } from './featureActionCreators';
import { getSprintsFromApi } from './sprintActionCreators';
// import preload from './data.json';

import Landing from './Landing';
import Catalog from './Catalog';
import Admin from './admin/component/Admin';
import Sprint from './Sprint';
import LoginPage from './auth/components/LoginPage';
import RegisterPage from './auth/components/RegisterPage';
import UserCreate from './UserCreate';
import UserConfig from './UserConfig';
import UserVerify from './UserVerify';
// import ErrorMessage from './ErrorMessage';
import PageNotFoundMessage from './PageNotFoundMessage';

import authenticationService from './service/authenticationService';

class MainRoute extends Component {
	state = {
		error: false,
		errorMessage: null
	};

	componentWillMount() {
		this.initializeLoginSatus();
		this.props.initializeSprints();
	}

	initializeLoginSatus = () =>
		Promise.all([authenticationService.getLoginStatus(), authenticationService.getCurrentUser()])
			.then(data => {
				const loggedIn = data[0];
				const currentUser = data[1];
				this.props.updateLoginStatus({ loggedIn, userName: currentUser.name, isAdmin: currentUser.isAdmin });

				this.props.initializeFeatures();
			})
			.catch(() => {
				this.props.updateLoginStatus({ loggedIn: false });
			});

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route exact path="/" component={Catalog} />
						<Route exact path="/landing" component={Landing} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={RegisterPage} />
						<Route
							path="/verify-account/:code"
							component={props => <UserVerify code={props.match.params.code} />}
						/>
						<Route exact path="/user-create" component={UserCreate} />
						<Route path="/user-config/:id" component={props => <UserConfig id={props.match.params.id} />} />
						<Route path="/admin" component={Admin} />
						<Route path="/sprint/:url" component={props => <Sprint url={props.match.params.url} />} />
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
	initializeFeatures() {
		dispatch(getFeaturesFromApi());
	},
	initializeSprints() {
		dispatch(getSprintsFromApi());
	}
});

MainRoute.propTypes = {
	updateLoginStatus: PropTypes.func.isRequired,
	initializeFeatures: PropTypes.func.isRequired,
	initializeSprints: PropTypes.func.isRequired
};

MainRoute.defaultProps = {
	loggedIn: null
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
