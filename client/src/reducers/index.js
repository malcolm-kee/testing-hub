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
import { sprintReducer, sprintSelector } from './sprintReducer';
import { entitiesReducer } from './entitiesReducer';

export {
  selectFeatures,
  selectSprints,
  selectFeatureCount,
  selectSprintCount,
  selectSprintShallow,
  makeSelectOneFeature
} from './entitiesReducer';

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  user: userReducer,
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
