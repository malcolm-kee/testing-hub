import { combineReducers } from 'redux';

import userReducer from './userReducer';
import featureReducer from './featureReducer';
import sprintReducer from './sprintReducer';

const reducers = combineReducers({ user: userReducer, features: featureReducer, sprints: sprintReducer });

export default reducers;
