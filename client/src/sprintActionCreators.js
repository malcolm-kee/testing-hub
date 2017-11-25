import axios from 'axios';
import authenticationService from './service/authenticationService';
import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from './constants/actions';

export function setSprints({ sprints }) {
	return { type: SET_SPRINTS, payload: sprints };
}

export function getSprintsFromApi() {
	return dispatch => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.get('/api/sprint', {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
						dispatch(setSprints({ sprints: response.data }));
					})
					.catch(err => {
						console.error('error in getSprintsFromApi', err); // eslint-disable-line no-console
					});
			})
			.catch(err => {
				console.error('error in getToken', err); // eslint-disable-line no-console
			});
	};
}

export function addSprint({ sprint }) {
	return { type: ADD_SPRINT, payload: sprint };
}

export function updateSprint({ sprint }) {
	return { type: UPDATE_SPRINT, payload: sprint };
}

export function deleteSprint({ id }) {
	return { type: DELETE_SPRINT, payload: id };
}
