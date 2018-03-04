import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from './../constants/actions';
import { createListDataReducer, createListDataSelector } from './utils/createDataReducer';

export const featureReducer = createListDataReducer({
  SET: SET_FEATURES,
  APPEND: ADD_FEATURE,
  UPDATE: UPDATE_FEATURE,
  DELETE: DELETE_FEATURE
});

export const featureSelector = createListDataSelector();
