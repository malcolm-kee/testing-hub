import React from 'react';
import PropTypes from 'prop-types';

const RenderInput = props => {
	const { input, label, id, type, meta: { touched, error, warning } } = props;

	return (
		<div>
			<div className="form-group">
				<label htmlFor={id} className="form-label">
					{label}
				</label>
				<input id={id} {...input} type={type} placeholder={label} className="form-control" />
				{touched &&
					((error && <span className="help-block text-danger">{error}</span>) ||
						(warning && <span className="help-block text-warning">{warning}</span>))}
			</div>
		</div>
	);
};

RenderInput.propTypes = {
	input: PropTypes.shape({
		checked: PropTypes.bool,
		name: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
	}).isRequired,
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string,
		warning: PropTypes.string
	}).isRequired
};

RenderInput.defaultProps = {
	type: 'text'
};

export default RenderInput;
