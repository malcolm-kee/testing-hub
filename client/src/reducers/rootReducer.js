import { combineReducers } from 'redux';

// self-implemented combineReducers based on lesson on https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
/*
const combineReducers = reducers => (state = {}, action) =>
	Object.keys(reducers).reduce(
		(nextState, key) => Object.assign(nextState, { [key]: reducers[key](state[key], action) }),
		{}
	);
*/

import userReducer from './userReducer';
import featureReducer from './featureReducer';
import sprintReducer from './sprintReducer';

const rootReducer = combineReducers({ user: userReducer, features: featureReducer, sprints: sprintReducer });

export default rootReducer;
