import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from './../constants/actions';

const DEFAULT_STATE = [];

const setSprints = (state, action) => action.payload;

const addSprint = (state, action) => state.concat(action.payload);

const updateSprint = (state, action) => {
	const updatedSprint = action.payload;

	return state.map(sprint => {
		if (sprint.id === updatedSprint.id) {
			return updatedSprint;
		}
		return sprint;
	});
};

const deleteSprint = (state, action) => {
	const deletedId = action.payload;

	return state.filter(sprint => sprint.id !== deletedId);
};

const sprintReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SPRINTS:
			return setSprints(state, action);

		case ADD_SPRINT:
			return addSprint(state, action);

		case UPDATE_SPRINT:
			return updateSprint(state, action);

		case DELETE_SPRINT:
			return deleteSprint(state, action);

		default:
			return state;
	}
};

export default sprintReducer;
