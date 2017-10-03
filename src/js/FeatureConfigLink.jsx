import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ulid from 'ulid';

class FeatureConfigLink extends Component {
	state = {
		id: this.props.id,
		url: this.props.url,
		env: this.props.env
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleAddLink = event => {
		event.preventDefault();
		this.props.addLink(this.state);
		this.setState({
			id: ulid(),
			url: '',
			env: ''
		});
	};

	handleRemoveLink = event => {
		event.preventDefault();
		this.props.removeLink(this.state.env);
	};

	render() {
		let actionBtn;
		let wrapperClass;

		if (this.props.new) {
			actionBtn = (
				<input className="btn btn-success pull-right" type="button" value="Add" onClick={this.handleAddLink} />
			);
			wrapperClass = 'panel panel-default';
		} else {
			actionBtn = (
				<input
					className="btn btn-danger pull-right"
					type="button"
					value="Remove"
					onClick={this.handleRemoveLink}
				/>
			);
			wrapperClass = 'panel panel-success';
		}

		return (
			<div className={wrapperClass}>
				<div className="panel-body">
					<div className="form form-horizontal">
						<div className="form-group row">
							<div className="col-sm-3">
								<label htmlFor={`link-env-${this.props.id}`} className="text-xlarge control-label">
									Env
								</label>
								<input
									type="text"
									id={`link-env-${this.props.id}`}
									className="form-control"
									name="env"
									value={this.state.env}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="col-sm-6">
								<label htmlFor={`link-url-${this.props.id}`} className="text-xlarge control-label">
									URL
								</label>
								<input
									type="url"
									id={`link-url-${this.props.id}`}
									name="url"
									className="form-control"
									value={this.state.url}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="col-sm-3">{actionBtn}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

FeatureConfigLink.propTypes = {
	new: PropTypes.bool,
	id: PropTypes.string,
	env: PropTypes.string,
	url: PropTypes.string,
	addLink: PropTypes.func,
	removeLink: PropTypes.func
};

FeatureConfigLink.defaultProps = {
	new: false,
	id: ulid(),
	env: '',
	url: '',
	addLink: function noop() {},
	removeLink: function noop() {}
};

export default FeatureConfigLink;
