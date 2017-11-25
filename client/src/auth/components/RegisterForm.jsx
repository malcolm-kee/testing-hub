import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import RenderInput from './../../components/form/RenderInput';
import { required, email, passwordRule } from './../../components/form/validators';

const RegisterForm = props => (
	<form onSubmit={props.handleSubmit}>
		<legend>Sign Up</legend>
		<Field name="name" type="text" component={RenderInput} label="Name" id="register-name" validate={required} />
		<Field
			name="email"
			type="email"
			component={RenderInput}
			label="Email"
			id="register-email"
			validate={[required, email]}
		/>
		<Field
			name="password"
			type="password"
			component={RenderInput}
			label="Password"
			id="register-password"
			validate={[required, passwordRule]}
		/>
		<div className="btn-toolbar">
			<div className="btn-group pull-right">
				<button type="submit" className="btn btn-primary">
					Sign Up
				</button>
			</div>
		</div>
	</form>
);

RegisterForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: 'registerForm' })(RegisterForm);
