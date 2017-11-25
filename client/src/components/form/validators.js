import { isEmail } from 'validator';

export const required = value => (value ? undefined : 'Required');
export const maxLength = max => value =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
export const email = value => (isEmail(value) ? undefined : 'Invalid email address');
