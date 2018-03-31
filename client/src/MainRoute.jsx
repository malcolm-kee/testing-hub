import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { Landing } from './Landing';
import Catalog from './Catalog';
import Admin from './admin/component/Admin';
import Sprint from './sprint/components/Sprint';
import LoginPage from './auth/components/LoginPage';
import RegisterPage from './auth/components/RegisterPage';
import { InitializeService } from './components/ajax/InitializeService';
import { AuthenticatedRoute, UnauthenticatedRoute } from './components/AuthenticatedRoute';
import UserCreate from './UserCreate';
import UserConfig from './UserConfig';
import UserVerify from './UserVerify';
// import ErrorMessage from './ErrorMessage';
import PageNotFoundMessage from './PageNotFoundMessage';
import { LandingPage } from './LandingPage';

export const MainRoute = () => (
  <InitializeService
    initializeOnMount
    render={({ isLoading }) =>
      isLoading ? (
        <LandingPage />
      ) : (
        <BrowserRouter>
          <div className="app">
            <Switch>
              <AuthenticatedRoute exact path={ROUTES.Catalog} component={Catalog} />
              <UnauthenticatedRoute exact path={ROUTES.Landing} component={Landing} />
              <UnauthenticatedRoute exact path={ROUTES.Login} component={LoginPage} />
              <UnauthenticatedRoute exact path={ROUTES.Register} component={RegisterPage} />
              <UnauthenticatedRoute path={ROUTES.UserVerify} component={UserVerify} />
              <AuthenticatedRoute exact path={ROUTES.UserCreate} component={UserCreate} />
              <AuthenticatedRoute path={ROUTES.UserConfig} component={UserConfig} />
              <AuthenticatedRoute path={ROUTES.Admin} component={Admin} />
              <AuthenticatedRoute path={ROUTES.Sprint} component={Sprint} />
              <Route component={PageNotFoundMessage} />
            </Switch>
          </div>
        </BrowserRouter>
      )}
  />
);

export default MainRoute;
