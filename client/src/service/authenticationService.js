import axios from 'axios';
import idbKeyval from 'idb-keyval';

function saveToken(token) {
	return new Promise((resolve, reject) => {
		idbKeyval
			.set('testhub-token', token)
			.then(() => {
				resolve();
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getToken() {
	return new Promise((resolve, reject) => {
		idbKeyval
			.get('testhub-token')
			.then(token => {
				resolve(token);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function removeToken() {
	return new Promise((resolve, reject) => {
		idbKeyval
			.delete('testhub-token')
			.then(() => {
				resolve();
			})
			.catch(err => {
				reject(err);
			});
	});
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
			.catch(error => {
				if (error.response) {
					reject({
						message: error.response.data.message
					});
				} else {
					reject();
				}
			});
	});
}

function verify({ code }) {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/verify', { code })
			.then(response => {
				if (response.status === 200) {
					const token = response.data.token;
					saveToken(token)
						.then(() => {
							const payload = JSON.parse(window.atob(token.split('.')[1]));
							resolve({
								email: payload.email,
								name: payload.name,
								isAdmin: payload.isAdmin
							});
						})
						.catch(() => {
							reject();
						});
				} else {
					reject();
				}
			})
			.catch(error => {
				if (error.response) {
					reject({
						message: error.response.data.message
					});
				} else {
					reject();
				}
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
					saveToken(token)
						.then(() => {
							const payload = JSON.parse(window.atob(token.split('.')[1]));
							resolve({
								email: payload.email,
								name: payload.name,
								isAdmin: payload.isAdmin
							});
						})
						.catch(() => {
							reject();
						});
				} else {
					reject();
				}
			})
			.catch(error => {
				if (error.response) {
					reject({
						message: error.response.data.message
					});
				} else {
					reject();
				}
			});
	});
}

function logout() {
	return removeToken();
}

function getLoginStatus() {
	return new Promise((resolve, reject) => {
		getToken()
			.then(token => {
				if (token) {
					const payload = JSON.parse(window.atob(token.split('.')[1]));
					const loggedIn = payload.exp > Date.now() / 1000;
					resolve(loggedIn);
				} else {
					reject();
				}
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getCurrentUser() {
	return new Promise((resolve, reject) => {
		getLoginStatus()
			.then(loggedIn => {
				if (loggedIn) {
					getToken()
						.then(token => {
							const payload = JSON.parse(window.atob(token.split('.')[1]));
							resolve({
								email: payload.email,
								name: payload.name,
								isAdmin: payload.isAdmin
							});
						})
						.catch(err => {
							reject(err);
						});
				} else {
					reject();
				}
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default { getToken, register, verify, login, logout, getLoginStatus, getCurrentUser };
