import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const SprintSummary = props => {
	const sprintItems = props.sprintItems;
	const passCount = sprintItems.filter(sprintItem => sprintItem.status === 'Passed').length;
	const wipCount = sprintItems.filter(sprintItem => sprintItem.status === 'In Progress').length;
	const blockedCount = sprintItems.filter(sprintItem => sprintItem.status === 'Blocked').length;
	const totalCount = sprintItems.length;

	const passRate = passCount / totalCount * 100;
	const wipRate = wipCount / totalCount * 100;
	const blockedRate = blockedCount / totalCount * 100;

	return (
		<ProgressBar>
			<ProgressBar bsStyle="danger" now={blockedRate} label={blockedCount} key={1} />
			<ProgressBar bsStyle="info" now={wipRate} label={wipCount} key={2} />
			<ProgressBar bsStyle="success" now={passRate} label={passCount} key={3} />
		</ProgressBar>
	);
};

SprintSummary.propTypes = {
	sprintItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired
		})
	).isRequired
};

export default SprintSummary;
