import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Header from './Header';

class Landing extends Component {
	componentWillMount() {
		if (this.props.loggedIn === true) {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<div>
				<Header showLogin />
				<div className="container-fluid">
					<div className="row">
						<div className="container">
							<div className="landing-message">
								<h1 className="heading">Welcome!</h1>
								<img
									src="/images/testing-hub-logo.png"
									alt="Testing Hub Logo"
									width="250"
									height="191"
								/>
								<div className="btn-toolbar">
									<Link to="/login" className="btn btn-primary">
										Login
									</Link>
									<Link to="/register" className="btn btn-success">
										Sign Up
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn });

Landing.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default connect(mapStateToProps)(withRouter(Landing));
