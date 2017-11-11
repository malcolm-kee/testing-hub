import axios from 'axios';
import authenticationService from './service/authenticationService';

import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from './actions';

export function setFeatures({ features }) {
	return { type: SET_FEATURES, payload: features };
}

export function getFeaturesFromApi() {
	return dispatch => {
		authenticationService
			.getToken()
			.then(token => {
				axios
					.get('/api/featureAll', {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(response => {
						dispatch(setFeatures({ features: response.data }));
					})
					.catch(err => {
						console.error('error in getFeaturesFromApi', err); // eslint-disable-line no-console
					});
			})
			.catch(err => {
				console.error('error in getToken', err); // eslint-disable-line no-console
			});
	};
}

export function addFeature({ feature }) {
	return { type: ADD_FEATURE, payload: feature };
}

export function updateFeature({ feature }) {
	return { type: UPDATE_FEATURE, payload: feature };
}

export function deleteFeature({ id }) {
	return { type: DELETE_FEATURE, payload: id };
}
