import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, OverlayTrigger, Popover } from 'react-bootstrap';

class SprintItem extends Component {
	handleSelectStatus = (eventKey, event) => {
		event.preventDefault();
		const status = eventKey;
		this.props.updateSprintItemStatus(this.props.id, status);
	};

	render() {
		const btnStyleMap = {
			'Not Started': undefined,
			'In Progress': 'info',
			Passed: 'success',
			Blocked: 'danger'
		};
		const btnStyle = btnStyleMap[this.props.status];
		const detailsPopover = (
			<Popover title="Details" id={`popOver-${this.props.id}`}>
				<div>{this.props.feature.name}</div>
				<ButtonToolbar>
					<ButtonGroup>
						{this.props.feature.links.map(link => (
							<Button key={link.id} href={link.url} target="_blank">
								{link.env}
							</Button>
						))}
					</ButtonGroup>
				</ButtonToolbar>
				{this.props.desc}
			</Popover>
		);
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<div className="panel-title">{this.props.scenarioId}</div>
				</div>
				<div className="panel-body">
					<h3 className="text-xxlarge">{this.props.name}</h3>
				</div>
				<div className="panel-footer">
					<ButtonToolbar>
						<ButtonGroup>
							<DropdownButton
								title={this.props.status}
								bsStyle={btnStyle}
								onSelect={this.handleSelectStatus}
								disabled={!this.props.editable}
								id={`actionBtn-${this.props.id}`}
							>
								<MenuItem eventKey="Not Started">Not Started</MenuItem>
								<MenuItem eventKey="In Progress">In Progress</MenuItem>
								<MenuItem eventKey="Passed">Passed</MenuItem>
								<MenuItem eventKey="Blocked">Blocked</MenuItem>
							</DropdownButton>
							<OverlayTrigger trigger="click" placement="bottom" overlay={detailsPopover}>
								<Button>Details</Button>
							</OverlayTrigger>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
			</div>
		);
	}
}

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
	updateSprintItemStatus: PropTypes.func.isRequired
};

SprintItem.defaultProps = {
	status: 'Not Started',
	scenarioId: 'Scenario',
	desc: ''
};

export default SprintItem;
