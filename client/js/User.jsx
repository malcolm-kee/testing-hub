import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = props => {
	const targetUrl = `/user-config/${props.id}`;
	return (
		<Link to={targetUrl} className="list-group-item">
			<span className="text-xlarge">{props.name}</span>
		</Link>
	);
};

User.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default User;
