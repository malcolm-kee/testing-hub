import React from 'react';
import PropTypes from 'prop-types';

const Feature = props => (
	<div className="offering" id={props.id}>
		<div className="offering-details">
			<h3 className="text-xxlarge">{props.name}</h3>
		</div>
		<div className="env-links btn-group btn-group-justified">
			{props.links.map(link => (
				<a key={link.id} href={link.url} target="_blank" className="btn btn-primary text-xxlarge">
					{link.env}
				</a>
			))}
		</div>
	</div>
);

Feature.propTypes = {
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

export default Feature;
