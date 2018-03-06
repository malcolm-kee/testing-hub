import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// self-implemented combineReducers based on lesson on https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
/*
const combineReducers = reducers => (state = {}, action) =>
	Object.keys(reducers).reduce(
		(nextState, key) => Object.assign(nextState, { [key]: reducers[key](state[key], action) }),
		{}
	);
*/

import { userReducer, getLoginState, getIsAdmin, getUserName } from './userReducer';
import { featuresReducer, featureSelector } from './featureReducer';
import { sprintReducer, sprintSelector } from './sprintReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  features: featuresReducer,
  sprints: sprintReducer,
  form: formReducer
});

export const selectors = {
  getUserName(store) {
    return getUserName(store.user);
  },
  getLoginState(store) {
    return getLoginState(store.user);
  },
  getIsAdmin(store) {
    return getIsAdmin(store.user);
  },
  getFeatures(store) {
    return featureSelector.getAllAsList(store.features);
  },
  getFeature(store) {
    return featureSelector.getOne(store.features);
  },
  getFeatureLoading(store) {
    return featureSelector.getLoadingState(store.features);
  },
  getSprints(store) {
    return sprintSelector.getAllAsList(store.sprints);
  },
  getSprint(store) {
    return sprintSelector.getOne(store.sprints);
  },
  getSprintLoading(store) {
    return sprintSelector.getLoadingState(store.sprints);
  }
};
