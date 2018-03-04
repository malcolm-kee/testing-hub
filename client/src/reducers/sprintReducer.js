import {
  SET_SPRINTS,
  ADD_SPRINT,
  UPDATE_SPRINT,
  DELETE_SPRINT
} from "./../constants/actions";

import { createListDataReducer } from "./utils/createDataReducer";

const sprintReducer = createListDataReducer({
  SET: SET_SPRINTS,
  APPEND: ADD_SPRINT,
  UPDATE: UPDATE_SPRINT,
  DELETE: DELETE_SPRINT
});

export default sprintReducer;
