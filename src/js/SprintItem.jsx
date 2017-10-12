import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, OverlayTrigger, Popover } from 'react-bootstrap';

class SprintItem extends Component {
	state = {
		status: this.props.status
	};

	handleSelectStatus = (eventKey, event) => {
		event.preventDefault();
		const status = eventKey;
		this.setState({ status });
		this.props.updateSprintItemStatus(this.props.id, status);
	};

	render() {
		const btnStyleMap = {
			'Not Started': undefined,
			'In Progress': 'info',
			Passed: 'success',
			Blocked: 'danger'
		};
		const btnStyle = btnStyleMap[this.state.status];
		const detailsPopover = (
			<Popover title="Details">
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
					<div className="panel-title">{this.props.name}</div>
				</div>
				<div className="panel-body">
					<h3 className="text-xxlarge">{this.props.feature.name}</h3>
				</div>
				<div className="panel-footer">
					<ButtonToolbar>
						<ButtonGroup>
							<DropdownButton
								title={this.state.status}
								bsStyle={btnStyle}
								onSelect={this.handleSelectStatus}
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
	updateSprintItemStatus: PropTypes.func.isRequired
};

SprintItem.defaultProps = {
	status: 'Not Started',
	desc: ''
};

export default SprintItem;
