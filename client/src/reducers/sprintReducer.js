import { SET_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT } from './../constants/actions';

import { reduceReducers } from './utils/reduceReducers';
import { createKeyedListDataReducer, createKeyedListDataSelector } from './utils/createDataReducer';

const actionTypes = {
  SET: SET_SPRINTS,
  APPEND: ADD_SPRINT,
  DELETE: DELETE_SPRINT
};

export const sprintReducer = reduceReducers(
  createKeyedListDataReducer(actionTypes),
  (state, action) => {
    switch (action.type) {
      case UPDATE_SPRINT:
        return {
          ...state,
          [action.payload.id]: action.payload
        };

      default:
        return state;
    }
  }
);

export const sprintSelector = {
  ...createKeyedListDataSelector()()
};
