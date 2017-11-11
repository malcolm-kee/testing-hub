import { combineReducers } from 'redux';

import userReducer from './userReducer';
import featureReducer from './featureReducer';

const reducers = combineReducers({ user: userReducer, features: featureReducer });

export default reducers;
