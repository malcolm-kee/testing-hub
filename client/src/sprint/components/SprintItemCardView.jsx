import React from 'react';
import PropTypes from 'prop-types';

import SprintItem from './SprintItem';

const SprintItemCardView = props => (
	<div>
		{props.sprintItems.map(sprintItem => (
			<div key={sprintItem.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 pad-vertical">
				<SprintItem
					handleSprintItemStatusSelect={props.handleSprintItemStatusSelect}
					editable={props.loggedIn}
					{...sprintItem}
				/>
			</div>
		))}
	</div>
);

SprintItemCardView.propTypes = {
	handleSprintItemStatusSelect: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool,
	sprintItems: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired
};

SprintItemCardView.defaultProps = {
	loggedIn: false
};

export default SprintItemCardView;
