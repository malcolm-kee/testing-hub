import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { selectors, selectFeatures, selectSprintShallow } from './reducers';

import { ErrorBoundary } from './components/ErrorBoundary';
import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';

import preferenceService from './service/preferenceService';

class CatalogContainer extends Component {
  state = {
    searchTerm: '',
    fav: []
  };

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  toggleFav = id => {
    if (this.state.fav.includes(id) === true) {
      preferenceService.removeFavFeature(id).then(favFeatures => {
        this.setState({ fav: favFeatures });
      });
    } else {
      preferenceService.addFavFeature(id).then(favFeatures => {
        this.setState({ fav: favFeatures });
      });
    }
  };

  render() {
    const { sprints, features } = this.props;

    let sprintPageNav;
    let featureContent;

    if (sprints.length > 0) {
      const sprintNavItems = sprints.map(sprint => {
        const urlTarget = `/sprint/${sprint.url}`;
        return (
          <LinkContainer to={urlTarget} key={sprint.id}>
            <MenuItem className="text-xlarge">{sprint.name}</MenuItem>
          </LinkContainer>
        );
      });
      sprintPageNav = (
        <div className="container">
          <Navbar inverse>
            <Nav className="text-xxlarge">
              <NavDropdown id="sprints-list" title="Sprint">
                {sprintNavItems}
              </NavDropdown>
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      sprintPageNav = (
        <div className="container">
          <Navbar inverse>
            <Navbar.Text>No Sprint is Available.</Navbar.Text>
          </Navbar>
        </div>
      );
    }

    if (features.length > 0) {
      featureContent = features
        .filter(
          feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
        )
        .sort((a, b) => {
          if (this.state.fav.includes(a.id) && !this.state.fav.includes(b.id)) {
            return -1;
          } else if (!this.state.fav.includes(a.id) && this.state.fav.includes(b.id)) {
            return 1;
          }
          return 0;
        })
        .map(feature => {
          const pinned = this.state.fav.includes(feature.id);
          return (
            <div key={feature.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 pad-vertical">
              <Feature toggleFav={this.toggleFav} pinned={pinned} {...feature} />
            </div>
          );
        });
    } else {
      featureContent = <div>No feature is available</div>;
    }

    return (
      <div>
        <Header showLogin />
        <div className="container-fluid">
          <div className="row">
            <header className="page-header">
              <h1>Testing Links</h1>
            </header>
            {sprintPageNav}
            <div className="container">
              <SearchBar
                handleSearchTermChange={this.handleSearchTermChange}
                searchTerm={this.state.searchTerm}
              />
              <div className="row">
                <div className="col-sm-12 col-xs-12">{featureContent}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: selectors.getLoginState(state),
  features: selectFeatures(state),
  sprints: selectSprintShallow(state)
});

CatalogContainer.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  sprints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

CatalogContainer.defaultProps = {
  sprints: null
};

const Catalog = props => (
  <ErrorBoundary>
    <CatalogContainer {...props} />
  </ErrorBoundary>
);

export default withRouter(connect(mapStateToProps)(Catalog));
