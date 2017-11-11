import axios from 'axios';
import authenticationService from './authenticationService';

function getPublic() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/feature')
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
			.get(`/api/feature/id/${id}`)
			.then(response => {
				if (response.status === 200) {
					resolve(response.data.sprints[0]);
				} else {
					reject();
				}
			})
			.catch(() => {
				reject();
			});
	});
}

function create({ name, requireLogin, links }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.post(
						'/api/feature',
						{
							name,
							requireLogin,
							links
						},
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
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

function update({ id, name, requireLogin, links }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.put(
						`/api/feature/id/${id}`,
						{
							name,
							requireLogin,
							links
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
					.catch(() => {
						reject();
					});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function remove({ id }) {
	return new Promise((resolve, reject) => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.delete(`/api/feature/id/${id}`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
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
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default { getPublic, getOne, create, update, remove };
