import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ulid from 'ulid';
import { isURL } from 'validator';

class FeatureConfigLink extends Component {
	state = {
		id: this.props.id,
		url: this.props.url,
		env: this.props.env,
		error: ''
	};

	validateLink = () => {
		if (this.state.env.length === 0) {
			this.setState({ error: 'Env is required' });
			return false;
		} else if (isURL(this.state.url) === false) {
			this.setState({ error: 'Please enter a valid URL' });
			return false;
		}
		return true;
	};

	handleAddLink = event => {
		event.preventDefault();
		if (this.validateLink()) {
			this.props.addLink({ id: this.state.id, env: this.state.env, url: this.state.url });
			this.setState({
				id: ulid(),
				url: '',
				env: ''
			});
		}
	};

	handleRemoveLink = event => {
		event.preventDefault();
		this.props.removeLink(this.state.id);
	};

	render() {
		let actionBtn;
		let wrapperClass;
		let errorMessage;

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

		if (this.state.error) {
			errorMessage = <div className="alert alert-danger text-large">{this.state.error}</div>;
		}

		return (
			<div className={wrapperClass}>
				<div className="panel-body">
					<div className="form form-horizontal">
						<div className="form-group row">
							<div className="col-xs-12 col-sm-3">
								<label htmlFor={`link-env-${this.props.id}`} className="text-xlarge control-label">
									Env
								</label>
								<input
									type="text"
									id={`link-env-${this.props.id}`}
									data-linkid={this.props.id}
									className="form-control"
									name="env"
									value={this.props.env}
									onChange={this.props.handleLinkInputChange}
								/>
							</div>
							<div className="col-xs-12 col-sm-5">
								<label htmlFor={`link-url-${this.props.id}`} className="text-xlarge control-label">
									URL
								</label>
								<input
									type="url"
									id={`link-url-${this.props.id}`}
									data-linkid={this.props.id}
									name="url"
									className="form-control"
									value={this.props.url}
									onChange={this.props.handleLinkInputChange}
								/>
							</div>
							<div className="col-xs-8 col-sm-2">{errorMessage}</div>
							<div className="col-xs-4 col-sm-2">{actionBtn}</div>
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
	removeLink: PropTypes.func,
	handleLinkInputChange: PropTypes.func
};

FeatureConfigLink.defaultProps = {
	new: false,
	id: ulid(),
	env: '',
	url: '',
	addLink: function noop() {},
	removeLink: function noop() {},
	handleLinkInputChange: function noop() {}
};

export default FeatureConfigLink;
