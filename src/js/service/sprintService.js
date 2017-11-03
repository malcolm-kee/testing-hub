import axios from 'axios';
import authenticationService from './authenticationService';

function getAll() {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/sprint')
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

function getOne({ id, url }) {
	return new Promise((resolve, reject) => {
		const apiTarget = id ? `/api/sprint/id/${id}` : `/api/sprint/url/${url}`;
		axios
			.get(apiTarget)
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

function create({ name, url, desc, sprintItems }) {
	return new Promise((resolve, reject) => {
		axios
			.post(
				'/api/sprint',
				{
					name,
					url,
					desc,
					sprintItems
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

function update({ id, name, url, desc, sprintItems }) {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`/api/sprint/id/${id}`,
				{
					name,
					url,
					desc,
					sprintItems
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

function updateItemStatus({ id, itemId, status }) {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`/api/sprint/id/${id}/item/${itemId}`,
				{
					status
				},
				{
					headers: {
						Authorization: `Bearer ${authenticationService.getToken()}`
					}
				}
			)
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

function remove({ id }) {
	return new Promise((resolve, reject) => {
		axios
			.delete(`/api/sprint/id/${id}`, {
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

export default { getAll, getOne, create, update, updateItemStatus, remove };
