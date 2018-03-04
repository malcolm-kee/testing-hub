import { combineReducers } from 'redux';
import {
  SET_FEATURES,
  ADD_FEATURE,
  UPDATE_FEATURE,
  DELETE_FEATURE,
  LOADING_FEATURE,
  LOAD_FEATURE_ERROR
} from './../constants/actions';
import { createListDataReducer, createListDataSelector } from './utils/createDataReducer';
import { createLoadingReducer, createLoadingSelector } from './utils/createLoadingReducer';

const actionTypes = {
  SET: SET_FEATURES,
  APPEND: ADD_FEATURE,
  UPDATE: UPDATE_FEATURE,
  DELETE: DELETE_FEATURE,
  LOADING: LOADING_FEATURE,
  ERROR: LOAD_FEATURE_ERROR
};

export const featureReducer = combineReducers({
  data: createListDataReducer(actionTypes),
  loading: createLoadingReducer(actionTypes)
});

export const featureSelector = {
  ...createListDataSelector('data'),
  ...createLoadingSelector('loading')
};
