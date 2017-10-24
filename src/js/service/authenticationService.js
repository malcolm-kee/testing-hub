import axios from 'axios';

function saveToken(token) {
	window.localStorage.setItem('testhub-token', token);
}

function getToken() {
	return window.localStorage.getItem('testhub-token');
}

function removeToken() {
	window.localStorage.removeItem('testhub-token');
}

function register({ name, email, isAdmin, password }) {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/register', { name, email, isAdmin, password })
			.then(response => {
				if (response.status === 200) {
					resolve();
				} else {
					reject();
				}
			})
			.catch(() => {
				reject();
			});
	});
}

function login({ email, password }) {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/login', { email, password })
			.then(response => {
				if (response.status === 200) {
					const token = response.data.token;
					saveToken(token);
					resolve();
				} else {
					reject();
				}
			})
			.catch(() => {
				reject();
			});
	});
}

function logout() {
	removeToken();
}

function isLoggedIn() {
	const token = getToken();

	if (token) {
		const payload = JSON.parse(window.atob(token.split('.')[1]));

		return payload.exp > Date.now() / 1000;
	}
	return false;
}

function getCurrentUser() {
	if (isLoggedIn()) {
		const token = getToken();
		const payload = JSON.parse(window.atob(token.split('.')[1]));
		return {
			email: payload.email,
			name: payload.name,
			isAdmin: payload.isAdmin
		};
	}
	return false;
}

export default { getToken, register, login, logout, isLoggedIn, getCurrentUser };
