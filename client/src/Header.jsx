import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { setLoginStatus } from './actions/auth';
import { selectors } from './reducers';

import DotsLoader from './DotsLoader';

import { logout } from './service/authenticationService';

class Header extends Component {
  handleSelectUserAction = (eventKey, event) => {
    event.preventDefault();
    const action = eventKey;
    switch (action) {
      case 'Administer':
        this.props.history.push('/admin');
        break;
      case 'Logout':
        logout().then(() => {
          this.props.logoutUser();
        });
        break;
      default:
        this.props.history.push('/');
    }
  };

  render() {
    let navigator;
    let profileManager;

    if (this.props.back === true || this.props.next === true) {
      let backBtn;
      let nextBtn;

      if (this.props.back === true) {
        backBtn = (
          <button type="button" className="btn btn-default" onClick={this.props.backAction}>
            <span className="glyphicon glyphicon-menu-left text-large" />
            &nbsp;Back
          </button>
        );
      }

      if (this.props.next === true) {
        nextBtn = (
          <button type="button" className="btn btn-success" onClick={this.props.nextAction}>
            Next&nbsp;
            <span className="glyphicon glyphicon-ok text-large" />
          </button>
        );
      }

      navigator = (
        <Nav pullRight>
          <form className="navbar-form navbar-right">
            {backBtn}
            {nextBtn}
          </form>
        </Nav>
      );
    } else if (this.props.showLogin) {
      if (this.props.loggedIn === true) {
        const userNameNode = <span className="text-xlarge">{this.props.userName}</span>;
        profileManager = (
          <Nav pullRight>
            <DropdownButton
              title={userNameNode}
              onSelect={this.handleSelectUserAction}
              bsStyle="info"
              id="header-options"
            >
              <MenuItem id="nav-Admin" eventKey="Administer">
                Administer
              </MenuItem>
              <MenuItem id="auth-Logout" eventKey="Logout">
                Logout
              </MenuItem>
            </DropdownButton>
          </Nav>
        );
      } else if (this.props.loggedIn === false) {
        profileManager = (
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem className="text-xlarge">Login</NavItem>
            </LinkContainer>
            <Navbar.Text>/</Navbar.Text>
            <LinkContainer to="/register">
              <NavItem className="text-xlarge">Sign Up</NavItem>
            </LinkContainer>
          </Nav>
        );
      } else {
        profileManager = (
          <Nav pullRight>
            <DotsLoader />
          </Nav>
        );
      }
    }

    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">All New Testing Hub</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {navigator}
          {profileManager}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: selectors.getLoginState(state),
  userName: selectors.getUserName(state)
});
const mapDispatchToProps = dispatch => ({
  logoutUser() {
    dispatch(setLoginStatus({ loggedIn: false }));
  }
});

Header.propTypes = {
  back: PropTypes.bool,
  backAction: PropTypes.func,
  next: PropTypes.bool,
  nextAction: PropTypes.func,
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  showLogin: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

Header.defaultProps = {
  loggedIn: null,
  userName: '',
  back: false,
  backAction: function noop() {},
  next: false,
  nextAction: function noop() {},
  showLogin: false
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
