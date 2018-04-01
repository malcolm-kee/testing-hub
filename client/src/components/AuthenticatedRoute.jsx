import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { selectors } from '../reducers';

const AuthenticatedRouteComponent = ({ component: Component, loggedIn, ...restProps }) => (
  <Route
    {...restProps}
    render={props => (loggedIn ? <Component {...props} /> : <Redirect to={ROUTES.Login} />)}
  />
);

AuthenticatedRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const UnauthenticatedRouteComponent = ({ component: Component, loggedIn, ...restProps }) => (
  <Route
    {...restProps}
    render={props => (loggedIn ? <Redirect to={ROUTES.Catalog} /> : <Component {...props} />)}
  />
);

UnauthenticatedRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const mapState = state => ({
  loggedIn: selectors.getLoginState(state)
});

export const AuthenticatedRoute = connect(mapState)(AuthenticatedRouteComponent);
export const UnauthenticatedRoute = connect(mapState)(UnauthenticatedRouteComponent);
