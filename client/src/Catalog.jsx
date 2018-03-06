import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

import { selectors } from './reducers';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import DotsLoader from './DotsLoader';

import preferenceService from './service/preferenceService';

class Catalog extends Component {
  state = {
    searchTerm: '',
    fav: []
  };

  componentDidMount() {
    // increase security to require login to access
    if (this.props.loggedIn === false) {
      this.props.history.push('/landing');
    } else {
      preferenceService.getFavFeatures().then(favFeatures => {
        this.setState({ fav: favFeatures });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn === false) {
      this.props.history.push('/landing');
    } else if (nextProps.loggedIn === true && this.props.loggedIn === false) {
      preferenceService.getFavFeatures().then(favFeatures => {
        this.setState({ fav: favFeatures });
      });
    }
  }

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
    const { loggedIn, sprints, sprintLoading, features, featureLoading } = this.props;

    let sprintPageNav;
    let featureContent;

    if (loggedIn === true) {
      if (sprintLoading) {
        sprintPageNav = (
          <div className="container">
            <Navbar inverse>
              <Navbar.Text>
                <DotsLoader />
              </Navbar.Text>
            </Navbar>
          </div>
        );
      } else if (sprints.length > 0) {
        const sprintNavItems = sprints.map(sprint => {
          const urlTarget = `/sprint/${sprint.url}`;
          return (
            <MenuItem key={sprint.id}>
              <Link to={urlTarget} className="text-xlarge">
                {sprint.name}
              </Link>
            </MenuItem>
          );
        });
        sprintPageNav = (
          <div className="container">
            <Navbar inverse>
              <Nav className="text-xxlarge">
                <NavDropdown title="Sprint">{sprintNavItems}</NavDropdown>
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
    }

    if (featureLoading) {
      featureContent = <Spinner />;
    } else if (features.length > 0) {
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
  features: selectors.getFeatures(state),
  sprints: selectors.getSprints(state)
});

Catalog.propTypes = {
  featureLoading: PropTypes.bool.isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  sprintLoading: PropTypes.bool.isRequired,
  sprints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  loggedIn: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

Catalog.defaultProps = {
  loggedIn: null,
  sprints: null
};

export default withRouter(connect(mapStateToProps)(Catalog));
