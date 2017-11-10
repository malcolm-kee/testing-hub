import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, OverlayTrigger, Popover } from 'react-bootstrap';
import Markdown from 'react-remarkable';

const SprintItem = props => {
	const btnStyleMap = {
		'Not Started': undefined,
		'In Progress': 'info',
		Passed: 'success',
		Blocked: 'danger'
	};
	const btnStyle = btnStyleMap[props.status];
	const detailsPopover = (
		<Popover title="Details" id={`popOver-${props.id}`}>
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
		<div className="panel panel-default">
			<div className="panel-heading">
				<div className="panel-title">{props.scenarioId}</div>
			</div>
			<div className="panel-body">
				<h3 className="text-xxlarge">{props.name}</h3>
			</div>
			<div className="panel-footer">
				<ButtonToolbar>
					<ButtonGroup>
						<DropdownButton
							title={props.status}
							bsStyle={btnStyle}
							onSelect={props.handleSprintItemStatusSelect}
							disabled={!props.editable}
							id={`actionBtn-${props.id}`}
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
						<OverlayTrigger trigger="click" placement="bottom" overlay={detailsPopover}>
							<Button>Details</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</ButtonToolbar>
			</div>
		</div>
	);
};

SprintItem.propTypes = {
	id: PropTypes.string.isRequired,
	scenarioId: PropTypes.string,
	name: PropTypes.string.isRequired,
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
	status: PropTypes.string,
	desc: PropTypes.string,
	editable: PropTypes.bool.isRequired,
	handleSprintItemStatusSelect: PropTypes.func.isRequired
};

SprintItem.defaultProps = {
	status: 'Not Started',
	scenarioId: 'Scenario',
	desc: ''
};

export default SprintItem;
