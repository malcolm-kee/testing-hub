import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import SprintItemTableRow from './SprintItemTableRow';

const SprintItemTableView = props => (
	<Table responsive bordered hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Scenario Id</th>
				<th>Scenario Title</th>
				<th>Scenario Status</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{props.sprintItems.map((sprintItem, index) => (
				<SprintItemTableRow
					key={sprintItem.id}
					count={index + 1}
					handleSprintItemStatusSelect={props.handleSprintItemStatusSelect}
					editable={props.loggedIn}
					{...sprintItem}
				/>
			))}
		</tbody>
	</Table>
);

SprintItemTableView.propTypes = {
	handleSprintItemStatusSelect: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool,
	sprintItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			scenarioId: PropTypes.string,
			name: PropTypes.string.isRequired,
			status: PropTypes.string,
			feature: PropTypes.shape({
				name: PropTypes.string.isRequired
			}).isRequired
		})
	).isRequired
};

SprintItemTableView.defaultProps = {
	loggedIn: false
};

export default SprintItemTableView;
