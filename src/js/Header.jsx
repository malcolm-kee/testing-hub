import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<nav className="navbar navbar-fixed-top">
		<div className="container">
			<div className="navbar-header">
				<Link to="/" className="navbar-brand">
					Testing Hub
				</Link>
			</div>
		</div>
	</nav>
);

export default Header;
