import React from 'react';
import PropTypes from 'prop-types';

const FeatureConfigLink = props => (
	<div className="panel panel-success">
		<div className="panel-body">
			<div className="form-group row">
				<div className="col-xs-12 col-sm-3">
					<label htmlFor={`link-env-${props.id}`} className="text-xlarge control-label">
						Env
					</label>
					<input
						type="text"
						id={`link-env-${props.id}`}
						data-linkid={props.id}
						className="form-control"
						name="env"
						value={props.env}
						onChange={props.handleLinkInputChange}
					/>
				</div>
				<div className="col-xs-12 col-sm-5">
					<label htmlFor={`link-url-${props.id}`} className="text-xlarge control-label">
						URL
					</label>
					<input
						type="url"
						id={`link-url-${props.id}`}
						data-linkid={props.id}
						name="url"
						className="form-control"
						value={props.url}
						onChange={props.handleLinkInputChange}
					/>
				</div>
				<div className="col-xs-4 col-sm-4">
					<input
						className="btn btn-danger pull-right"
						data-linkid={props.id}
						type="button"
						value="Remove"
						onClick={props.handleLinkRemove}
					/>
				</div>
			</div>
		</div>
	</div>
);

FeatureConfigLink.propTypes = {
	id: PropTypes.string.isRequired,
	env: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	handleLinkRemove: PropTypes.func.isRequired,
	handleLinkInputChange: PropTypes.func.isRequired
};

export default FeatureConfigLink;
