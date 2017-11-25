import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import RenderInput from './../../components/form/RenderInput';
import { required, email } from './../../components/form/validators';

const LoginForm = props => (
	<form onSubmit={props.handleSubmit}>
		<Field
			name="email"
			type="email"
			component={RenderInput}
			label="Email"
			id="login-email"
			validate={[required, email]}
		/>
		<Field
			name="password"
			type="password"
			component={RenderInput}
			label="Password"
			id="login-password"
			validate={required}
		/>
		<div className="btn-toolbar">
			<div className="btn-group pull-right">
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</div>
		</div>
	</form>
);

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
