import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from './../constants/actions';

import { createListDataReducer, createListDataSelector } from './utils/createDataReducer';

export const sprintReducer = createListDataReducer({
  SET: SET_SPRINTS,
  APPEND: ADD_SPRINT,
  UPDATE: UPDATE_SPRINT,
  DELETE: DELETE_SPRINT
});

export const sprintSelector = createListDataSelector();
