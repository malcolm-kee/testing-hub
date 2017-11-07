import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Panel, Form, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import ulid from 'ulid';

class SprintItemConfig extends Component {
	state = {
		id: this.props.id,
		scenarioId: this.props.scenarioId,
		name: this.props.name,
		status: this.props.status,
		featureId: this.props.new ? this.props.features[0].id : this.props.featureId,
		desc: this.props.desc
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleAddSprintItem = event => {
		event.preventDefault();
		this.props.addSprintItem(this.state);
		this.setState({
			id: ulid(),
			name: '',
			status: 'Not Started',
			featureId: '',
			desc: ''
		});
	};

	handleUpdateSprintItem = event => {
		event.preventDefault();
		this.props.updateSprintItem(this.state);
	};

	handleRemoveSprintItem = event => {
		event.preventDefault();
		this.props.removeSprintItem(this.state.id);
	};

	render() {
		let bsStyle;
		let headerText;
		let buttons;
		let statusField;

		if (this.props.new) {
			headerText = <span className="text-xlarge">Add sprint item</span>;
			buttons = (
				<div className="btn-toolbar">
					<div className="btn-group pull-right">
						<button type="button" className="btn btn-primary" onClick={this.handleAddSprintItem}>
							Add&nbsp;
							<span className="glyphicon glyphicon-plus text-large" />
						</button>
					</div>
				</div>
			);
		} else {
			bsStyle = 'info';
			headerText = <span className="text-xlarge">{this.state.name}</span>;
			buttons = (
				<div className="btn-toolbar">
					<div className="btn-group">
						<button type="button" className="btn btn-danger" onClick={this.handleRemoveSprintItem}>
							Remove&nbsp;
							<span className="glyphicon glyphicon-trash text-large" />
						</button>
					</div>
					<div className="btn-group pull-right">
						<button type="button" className="btn btn-primary" onClick={this.handleUpdateSprintItem}>
							Update&nbsp;
							<span className="glyphicon glyphicon-ok text-large" />
						</button>
					</div>
				</div>
			);
			statusField = (
				<FormGroup controlId="sprint-item-status">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Current Status</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl type="text" name="status" value={this.state.status} readOnly />
					</Col>
				</FormGroup>
			);
		}

		return (
			<div className="col-sm-6">
				<Panel header={headerText} bsStyle={bsStyle}>
					<Form horizontal>
						<fieldset>
							<FormGroup controlId="sprint-item-scenarioId">
								<Col sm={3}>
									<ControlLabel className="text-xlarge">Scenario Id</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl
										type="text"
										name="scenarioId"
										value={this.state.scenarioId}
										onChange={this.handleInputChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup controlId="sprint-item-name">
								<Col sm={3}>
									<ControlLabel className="text-xlarge">Name</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl
										type="text"
										name="name"
										value={this.state.name}
										onChange={this.handleInputChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup controlId="sprint-item-feature">
								<Col sm={3}>
									<ControlLabel className="text-xlarge">Feature</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl
										componentClass="select"
										name="featureId"
										value={this.state.featureId}
										onChange={this.handleInputChange}
									>
										{this.props.features.map(feature => (
											<option key={feature.id} value={feature.id}>
												{feature.name}
											</option>
										))}
									</FormControl>
								</Col>
							</FormGroup>
							{statusField}
							<FormGroup controlId="sprint-item-desc">
								<Col sm={3}>
									<ControlLabel className="text-xlarge">Details</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl
										componentClass="textarea"
										name="desc"
										value={this.state.desc}
										onChange={this.handleInputChange}
									/>
									<HelpBlock>
										You may format the description using{' '}
										<a
											href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
											target="_blank"
											rel="noopener noreferrer"
										>
											markdown syntax
										</a>
									</HelpBlock>
								</Col>
							</FormGroup>
							{buttons}
						</fieldset>
					</Form>
				</Panel>
			</div>
		);
	}
}

SprintItemConfig.propTypes = {
	id: PropTypes.string,
	scenarioId: PropTypes.string,
	name: PropTypes.string,
	featureId: PropTypes.string,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }))
		.isRequired,
	status: PropTypes.string,
	desc: PropTypes.string,
	new: PropTypes.bool,
	addSprintItem: PropTypes.func,
	updateSprintItem: PropTypes.func,
	removeSprintItem: PropTypes.func
};

SprintItemConfig.defaultProps = {
	id: ulid(),
	scenarioId: '',
	name: '',
	featureId: '',
	status: 'Not Started',
	desc: '',
	new: false,
	addSprintItem: function noop() {},
	updateSprintItem: function noop() {},
	removeSprintItem: function noop() {}
};

export default SprintItemConfig;
