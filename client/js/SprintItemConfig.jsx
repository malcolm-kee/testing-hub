import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
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
				<div className="form-group">
					<label htmlFor="sprint-item-status" className="col-sm-2 col-form-label text-xlarge text-right">
						Current Status
					</label>
					<div className="col-sm-10">
						<input
							type="text"
							id="sprint-item-status"
							name="status"
							className="form-control"
							value={this.state.status}
							readOnly
						/>
					</div>
				</div>
			);
		}

		return (
			<div className="col-sm-6">
				<Panel header={headerText} bsStyle={bsStyle}>
					<div className="form-horizontal">
						<fieldset>
							<div className="form-group">
								<label
									htmlFor="sprint-item-scenarioId"
									className="col-sm-2 col-form-label text-xlarge text-right"
								>
									Scneario Id
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										id="sprint-item-scenarioId"
										name="scenarioId"
										className="form-control"
										value={this.state.scenarioId}
										onChange={this.handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<label
									htmlFor="sprint-item-name"
									className="col-sm-2 col-form-label text-xlarge text-right"
								>
									Name
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										id="sprint-item-name"
										name="name"
										className="form-control"
										value={this.state.name}
										onChange={this.handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<label
									htmlFor="sprint-item-feature"
									className="col-sm-2 col-form-label text-xlarge text-right"
								>
									Feature
								</label>
								<div className="col-sm-10">
									<select
										name="featureId"
										id="sprint-item-feature"
										className="form-control"
										value={this.state.featureId}
										onChange={this.handleInputChange}
									>
										{this.props.features.map(feature => (
											<option key={feature.id} value={feature.id}>
												{feature.name}
											</option>
										))}
									</select>
								</div>
							</div>
							{statusField}
							<div className="form-group">
								<label
									htmlFor="sprint-item-desc"
									className="col-sm-2 col-form-label text-xlarge text-right"
								>
									Details
								</label>
								<div className="col-sm-10">
									<textarea
										name="desc"
										id="sprint-item-desc"
										className="form-control"
										value={this.state.desc}
										onChange={this.handleInputChange}
									/>
								</div>
							</div>
							{buttons}
						</fieldset>
					</div>
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
