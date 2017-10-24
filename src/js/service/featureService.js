import axios from 'axios';
import authenticationService from './authenticationService';

function getAll() {
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

function create({ name, links }) {
	return new Promise((resolve, reject) => {
		axios
			.post(
				'/api/feature',
				{
					name,
					links
				},
				{
					headers: {
						Authorization: `Bearer ${authenticationService.getToken()}`
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
	});
}

function update({ id, name, links }) {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`/api/feature/id/${id}`,
				{
					name,
					links
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

function remove({ id }) {
	return new Promise((resolve, reject) => {
		axios
			.delete(`/api/feature/id/${id}`, {
				headers: {
					Authorization: `Bearer ${authenticationService.getToken()}`
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
	});
}

export default { getAll, getOne, create, update, remove };
