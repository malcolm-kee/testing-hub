import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, OverlayTrigger, Popover } from 'react-bootstrap';
import Markdown from 'react-remarkable';

const SprintItemTableRow = props => {
	const btnStyleMap = {
		'Not Started': undefined,
		'In Progress': 'info',
		Passed: 'success',
		Blocked: 'danger'
	};
	const btnStyle = btnStyleMap[props.status];
	const detailsPopover = (
		<Popover title="Details" id={`rowPopOver-${props.id}`}>
			<div>{props.feature.name}</div>
			<ButtonToolbar>
				<ButtonGroup>
					{props.feature.links.map(link => (
						<Button key={link.id} href={link.url} target="_blank">
							{link.env}
						</Button>
					))}
				</ButtonGroup>
			</ButtonToolbar>
			<Markdown source={props.desc} />
		</Popover>
	);

	return (
		<tr>
			<td>{props.count}</td>
			<td>{props.scenarioId}</td>
			<td>{props.name}</td>
			<td>
				<DropdownButton
					title={props.status}
					bsStyle={btnStyle}
					onSelect={props.handleSprintItemStatusSelect}
					disabled={!props.editable}
					id={`rowActionBtn-${props.id}`}
				>
					<MenuItem eventKey="Not Started" data-itemid={props.id}>
						Not Started
					</MenuItem>
					<MenuItem eventKey="In Progress" data-itemid={props.id}>
						In Progress
					</MenuItem>
					<MenuItem eventKey="Passed" data-itemid={props.id}>
						Passed
					</MenuItem>
					<MenuItem eventKey="Blocked" data-itemid={props.id}>
						Blocked
					</MenuItem>
				</DropdownButton>
			</td>
			<td>
				<OverlayTrigger trigger="click" placement="bottom" overlay={detailsPopover}>
					<Button>Details</Button>
				</OverlayTrigger>
			</td>
		</tr>
	);
};

SprintItemTableRow.propTypes = {
	id: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	scenarioId: PropTypes.string,
	name: PropTypes.string.isRequired,
	status: PropTypes.string,
	desc: PropTypes.string,
	feature: PropTypes.shape({
		name: PropTypes.string.isRequired,
		links: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired,
				env: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	editable: PropTypes.bool.isRequired,
	handleSprintItemStatusSelect: PropTypes.func.isRequired
};

SprintItemTableRow.defaultProps = {
	scenarioId: 'No scenario id',
	desc: '',
	status: 'Not Started'
};

export default SprintItemTableRow;
