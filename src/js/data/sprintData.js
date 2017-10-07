import axios from 'axios';

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

function create({ name, url, desc, features }) {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/sprint', {
				name,
				url,
				desc,
				features
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

function update({ id, name, url, desc, features }) {
	return new Promise((resolve, reject) => {
		axios
			.put(`/api/sprint/id/${id}`, {
				name,
				url,
				desc,
				features
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

function remove({ id }) {
	return new Promise((resolve, reject) => {
		axios
			.delete(`/api/sprint/id/${id}`)
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
