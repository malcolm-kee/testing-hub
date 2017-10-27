import axios from 'axios';
import authenticationService from './authenticationService';

function getAll() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/user', {
				headers: {
					Authorization: `Bearer ${authenticationService.getToken()}`
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
	});
}

function getOne({ id }) {
	return new Promise((resolve, reject) => {
		axios
			.get(`/api/user/id/${id}`, {
				headers: {
					Authorization: `Bearer ${authenticationService.getToken()}`
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
	});
}

function create({ name, email, isAdmin, password }) {
	return new Promise((resolve, reject) => {
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
						Authorization: `Bearer ${authenticationService.getToken()}`
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
			.catch(() => {
				reject();
			});
	});
}

function update({ id, name, email, isAdmin, verified, password }) {
	return new Promise((resolve, reject) => {
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
						Authorization: `Bearer ${authenticationService.getToken()}`
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
			.catch(() => {
				reject();
			});
	});
}

export default { getAll, getOne, create, update };
