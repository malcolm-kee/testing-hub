import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from './actions';

const DEFAULT_STATE = [];

const setFeatures = (state, action) => action.payload;

const addFeature = (state, action) => state.concat(action.payload);

const updateFeature = (state, action) => {
	const updatedFeature = action.payload;

	return state.map(feature => {
		if (feature.id === updatedFeature.id) {
			return updatedFeature;
		}
		return feature;
	});
};

const deleteFeature = (state, action) => {
	const deletedId = action.payload;

	return state.filter(feature => feature.id !== deletedId);
};

const featureReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_FEATURES:
			return setFeatures(state, action);

		case ADD_FEATURE:
			return addFeature(state, action);

		case UPDATE_FEATURE:
			return updateFeature(state, action);

		case DELETE_FEATURE:
			return deleteFeature(state, action);

		default:
			return state;
	}
};

export default featureReducer;
