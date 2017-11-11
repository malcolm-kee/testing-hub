import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from './actions';

export function setSprints({ sprints }) {
	return { type: SET_SPRINTS, payload: sprints };
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

