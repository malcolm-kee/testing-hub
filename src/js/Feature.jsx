import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Feature = props => {
	let actionBar;

	if (props.editMode === true) {
		actionBar = (
			<div className="btn-group btn-group-justified">
				<Link to={`/feature-config/${props.id}`} className="btn btn-primary">
					<span className="glyphicon glyphicon-edit text-large" />
					<span className="hidden-xs text-xlarge">&nbsp;Edit</span>
				</Link>
			</div>
		);
	} else {
		actionBar = (
			<div className="btn-group btn-group-justified">
				{props.links.map(link => (
					<a key={link.id} href={link.url} target="_blank" className="btn btn-primary text-xxlarge">
						{link.env}
					</a>
				))}
			</div>
		);
	}

	return (
		<div className="panel panel-default" id={props.id}>
			<div className="panel-body">
				<h3 className="text-xxlarge">{props.name}</h3>
			</div>
			<div className="panel-footer">{actionBar}</div>
		</div>
	);
};

Feature.propTypes = {
	editMode: PropTypes.bool,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			env: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired
		})
	).isRequired
};

Feature.defaultProps = {
	editMode: false
};

export default Feature;
