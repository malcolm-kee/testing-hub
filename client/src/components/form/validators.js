import { isEmail } from 'validator';

export const required = value => (value ? undefined : 'Required');

export const maxLength = max => value =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => value =>
	value && value.length >= min ? undefined : `Must be at least ${min} characters`;

export const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

export const email = value => (isEmail(value) ? undefined : 'Invalid email address');

export const containsNumber = value => {
	if (/\d/.test(value) === false) {
		return 'Must contains number';
	}
	return undefined;
};

export const containsUpperCase = value => {
	if (/[A-Z]/.test(value) === false) {
		return 'Must contains uppercase';
	}
	return undefined;
};

export const containsLowerCase = value => {
	if (/[a-z]/.test(value) === false) {
		return 'Must contains lowercase';
	}
	return undefined;
};

export const passwordRule = value => {
	const minLength8 = minLength(8);
	return minLength8(value) || containsNumber(value) || containsUpperCase(value) || containsLowerCase(value);
};
