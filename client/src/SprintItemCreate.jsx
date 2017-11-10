import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Panel, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import ulid from 'ulid';

class SprintItemCreate extends Component {
	state = {
		id: ulid(),
		scenarioId: '',
		name: '',
		featureId: this.props.features[0].id,
		desc: ''
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
			scenarioId: '',
			name: '',
			featureId: this.props.features[0].id,
			desc: ''
		});
	};

	render() {
		const headerText = <span className="text-xlarge">Add sprint item</span>;

		return (
			<div className="col-sm-6">
				<Panel header={headerText}>
					<div>
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
						<div className="btn-toolbar">
							<div className="btn-group pull-right">
								<button type="button" className="btn btn-primary" onClick={this.handleAddSprintItem}>
									Add&nbsp;
									<span className="glyphicon glyphicon-plus text-large" />
								</button>
							</div>
						</div>
					</div>
				</Panel>
			</div>
		);
	}
}

SprintItemCreate.propTypes = {
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }))
		.isRequired,
	addSprintItem: PropTypes.func.isRequired
};

export default SprintItemCreate;
