import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Panel, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

const SprintItemConfig = props => (
	<div className="col-sm-6">
		<Panel header={props.name} bsStyle="info">
			<div>
				<FormGroup controlId="sprint-item-scenarioId">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Scenario Id</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl
							data-itemid={props.id}
							type="text"
							name="scenarioId"
							value={props.scenarioId}
							onChange={props.handleItemInputChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup controlId="sprint-item-name">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Name</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl
							data-itemid={props.id}
							type="text"
							name="name"
							value={props.name}
							onChange={props.handleItemInputChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup controlId="sprint-item-feature">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Feature</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl
							data-itemid={props.id}
							componentClass="select"
							name="featureId"
							value={props.featureId}
							onChange={props.handleItemInputChange}
						>
							{props.features.map(feature => (
								<option key={feature.id} value={feature.id}>
									{feature.name}
								</option>
							))}
						</FormControl>
					</Col>
				</FormGroup>
				<FormGroup controlId="sprint-item-status">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Current Status</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl type="text" name="status" value={props.status} readOnly />
					</Col>
				</FormGroup>
				<FormGroup controlId="sprint-item-desc">
					<Col sm={3}>
						<ControlLabel className="text-xlarge">Details</ControlLabel>
					</Col>
					<Col sm={9}>
						<FormControl
							data-itemid={props.id}
							componentClass="textarea"
							name="desc"
							value={props.desc}
							onChange={props.handleItemInputChange}
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
					<div className="btn-group">
						<button
							data-itemid={props.id}
							type="button"
							className="btn btn-danger"
							onClick={props.handleItemRemove}
						>
							Remove&nbsp;
							<span className="glyphicon glyphicon-trash text-large" />
						</button>
					</div>
				</div>
			</div>
		</Panel>
	</div>
);

SprintItemConfig.propTypes = {
	id: PropTypes.string.isRequired,
	scenarioId: PropTypes.string,
	name: PropTypes.string,
	featureId: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }))
		.isRequired,
	status: PropTypes.string,
	desc: PropTypes.string,
	handleItemInputChange: PropTypes.func.isRequired,
	handleItemRemove: PropTypes.func.isRequired
};

SprintItemConfig.defaultProps = {
	scenarioId: '',
	name: '',
	status: 'Not Started',
	desc: ''
};

export default SprintItemConfig;
