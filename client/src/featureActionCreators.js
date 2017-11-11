import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from './actions';

export function setFeatures({ features }) {
	return { type: SET_FEATURES, payload: features };
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
