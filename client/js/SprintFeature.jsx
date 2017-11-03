import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SprintFeature extends Component {
	handleAddFeature = event => {
		event.preventDefault();
		this.props.addSprintFeature({
			featureId: this.props.id
		});
	};

	handleRemoveFeature = event => {
		event.preventDefault();
		this.props.removeSprintFeature(this.props.id);
	};

	render() {
		let actionSection;

		if (this.props.added) {
			actionSection = (
				<div className="btn-group btn-group-justified">
					<div className="btn-group">
						<button className="btn btn-danger" onClick={this.handleRemoveFeature}>
							<span className="glyphicon glyphicon-trash text-large" />
							<span className="hidden-xs text-xlarge">&nbsp;Remove from Sprint</span>
						</button>
					</div>
				</div>
			);
		} else {
			actionSection = (
				<div className="btn-group btn-group-justified">
					<div className="btn-group">
						<button className="btn btn-primary" onClick={this.handleAddFeature}>
							<span className="glyphicon glyphicon-plus text-large" />
							<span className="hidden-xs text-xlarge">&nbsp;Add to Sprint</span>
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className="list-group-item" id={this.props.id}>
				<div className="row">
					<div className="col-sm-6">
						<h3 className="text-xxlarge">{this.props.name}</h3>
					</div>
					<div className="col-sm-6">{actionSection}</div>
				</div>
			</div>
		);
	}
}

SprintFeature.propTypes = {
	added: PropTypes.bool,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	addSprintFeature: PropTypes.func,
	removeSprintFeature: PropTypes.func
};

SprintFeature.defaultProps = {
	added: false,
	addSprintFeature: function noop() {},
	removeSprintFeature: function nooop() {}
};

export default SprintFeature;
