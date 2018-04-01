import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup } from 'react-bootstrap';
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

    const { back, next, hasNewUpdate } = this.props;

    if (back === true || next === true) {
      let backBtn;
      let nextBtn;

      if (back === true) {
        backBtn = (
          <Button type="button" className="btn btn-default" onClick={this.props.backAction}>
            <span className="glyphicon glyphicon-menu-left text-large" />
            &nbsp;Back
          </Button>
        );
      }

      if (next === true) {
        nextBtn = (
          <Button type="button" className="btn btn-success" onClick={this.props.nextAction}>
            Next&nbsp;
            <span className="glyphicon glyphicon-ok text-large" />
          </Button>
        );
      }

      navigator = (
        <Navbar.Form pullRight>
          <FormGroup>
            {backBtn}
            {nextBtn}
          </FormGroup>
        </Navbar.Form>
      );
    } else if (this.props.showLogin) {
      if (this.props.loggedIn === true) {
        const userNameNode = <span className="text-xlarge">{this.props.userName}</span>;
        profileManager = (
          <Nav pullRight>
            <NavDropdown
              title={userNameNode}
              onSelect={this.handleSelectUserAction}
              id="header-options"
            >
              <MenuItem id="nav-Admin" eventKey="Administer">
                Administer
              </MenuItem>
              <MenuItem id="auth-Logout" eventKey="Logout">
                Logout
              </MenuItem>
            </NavDropdown>
          </Nav>
        );
      } else if (this.props.loggedIn === false) {
        profileManager = (
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem className="text-xlarge" data-testid="login-btn">
                Login
              </NavItem>
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
      <Navbar fixedTop collapseOnSelect inverse>
        <Navbar.Header>
          <LinkContainer to="/login">
            <Navbar.Brand>Testing Hub</Navbar.Brand>
          </LinkContainer>
          {hasNewUpdate ? <span className="glyphicon glyphicon-alert text-large" /> : null}
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
  userName: selectors.getUserName(state),
  hasNewUpdate: selectors.selectHasNewUpdate(state)
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
  hasNewUpdate: PropTypes.bool.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
