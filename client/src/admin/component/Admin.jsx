import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors, selectFeatures, selectSprintShallow } from '../../reducers';

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
    if (this.props.isAdmin) {
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
    let sprintList = null;
    let featureList = null;

    if (this.props.sprints) {
      sprintList = this.props.sprints.filter(
        sprint => sprint.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
      );
    }
    if (this.props.features) {
      featureList = this.props.features.filter(
        feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
      );
    }
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
  loggedIn: selectors.getLoginState(state),
  isAdmin: selectors.getIsAdmin(state),
  features: selectFeatures(state),
  sprints: selectSprintShallow(state)
});

Admin.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })),
  sprints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  isAdmin: PropTypes.bool
};

Admin.defaultProps = {
  isAdmin: null,
  sprints: null,
  features: null
};

export default connect(mapStateToProps)(Admin);
