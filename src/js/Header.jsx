import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Header = props => {
	let navigator;

	if (props.back === true || props.next === true) {
		let backBtn;
		let nextBtn;

		if (props.back === true) {
			backBtn = (
				<button type="button" className="btn btn-default" onClick={props.backAction}>
					<span className="glyphicon glyphicon-menu-left text-large" />
					&nbsp;Back
				</button>
			);
		}

		if (props.next === true) {
			nextBtn = (
				<button type="button" className="btn btn-success" onClick={props.nextAction}>
					Next&nbsp;
					<span className="glyphicon glyphicon-ok text-large" />
				</button>
			);
		}

		navigator = (
			<form className="navbar-form navbar-right">
				{backBtn}
				{nextBtn}
			</form>
		);
	}

	return (
		<nav className="navbar navbar-fixed-top">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Testing Hub
				</Link>
				{navigator}
			</div>
		</nav>
	);
};

Header.propTypes = {
	back: PropTypes.bool,
	backAction: PropTypes.func,
	next: PropTypes.bool,
	nextAction: PropTypes.func
};

Header.defaultProps = {
	back: false,
	backAction: function noop() {},
	next: false,
	nextAction: function noop() {}
};

export default withRouter(Header);
