import axios from 'axios';
import authenticationService from './authenticationService';

function getAll() {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.get('/api/user', {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
						if (response.status === 200) {
							resolve(response.data);
						} else {
							reject();
						}
					})
					.catch(() => {
						reject();
					});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getOne({ id }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.get(`/api/user/id/${id}`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
						if (response.status === 200) {
							resolve(response.data.users[0]);
						} else {
							reject();
						}
					})
					.catch(() => {
						reject();
					});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function create({ name, email, isAdmin, password }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.post(
						'/api/user',
						{
							name,
							email,
							isAdmin,
							password
						},
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
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
			})
			.catch(err => {
				reject(err);
			});
	});
}

function update({ id, name, email, isAdmin, verified, password }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.put(
						`/api/user/id/${id}`,
						{
							name,
							email,
							isAdmin,
							verified,
							password
						},
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
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
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default { getAll, getOne, create, update };
