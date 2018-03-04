import { combineReducers } from 'redux';
import {
  SET_SPRINTS,
  ADD_SPRINT,
  UPDATE_SPRINT,
  DELETE_SPRINT,
  LOADING_SPRINT,
  LOAD_SPRINT_ERROR
} from './../constants/actions';

import { createListDataReducer, createListDataSelector } from './utils/createDataReducer';
import { createLoadingReducer, createLoadingSelector } from './utils/createLoadingReducer';

const actionTypes = {
  SET: SET_SPRINTS,
  APPEND: ADD_SPRINT,
  UPDATE: UPDATE_SPRINT,
  DELETE: DELETE_SPRINT,
  LOADING: LOADING_SPRINT,
  ERROR: LOAD_SPRINT_ERROR
};

export const sprintReducer = combineReducers({
  data: createListDataReducer(actionTypes),
  loading: createLoadingReducer(actionTypes)
});

export const sprintSelector = {
  ...createListDataSelector('data'),
  ...createLoadingSelector('loading')
};
