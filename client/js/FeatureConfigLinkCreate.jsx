import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ulid from 'ulid';
import { isURL } from 'validator';

class FeatureConfigLinkCreate extends Component {
	state = {
		id: ulid(),
		url: '',
		env: '',
		error: ''
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
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

	render() {
		let errorMessage;

		if (this.state.error) {
			errorMessage = <div className="alert alert-danger text-large">{this.state.error}</div>;
		}

		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="form form-horizontal">
						<div className="form-group row">
							<div className="col-xs-12 col-sm-3">
								<label htmlFor={`link-env-${this.state.id}`} className="text-xlarge control-label">
									Env
								</label>
								<input
									type="text"
									id={`link-env-${this.state.id}`}
									data-linkid={this.state.id}
									className="form-control"
									name="env"
									value={this.state.env}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="col-xs-12 col-sm-5">
								<label htmlFor={`link-url-${this.state.id}`} className="text-xlarge control-label">
									URL
								</label>
								<input
									type="url"
									id={`link-url-${this.state.id}`}
									data-linkid={this.state.id}
									name="url"
									className="form-control"
									value={this.state.url}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="col-xs-8 col-sm-2">{errorMessage}</div>
							<div className="col-xs-4 col-sm-2">
								<input
									className="btn btn-success pull-right"
									type="button"
									value="Add"
									onClick={this.handleAddLink}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

FeatureConfigLinkCreate.propTypes = {
	addLink: PropTypes.func.isRequired
};

export default FeatureConfigLinkCreate;
