import {
  SET_FEATURES,
  ADD_FEATURE,
  UPDATE_FEATURE,
  DELETE_FEATURE
} from "./../constants/actions";
import { createListDataReducer } from "./utils/createDataReducer";

const featureReducer = createListDataReducer({
  SET: SET_FEATURES,
  APPEND: ADD_FEATURE,
  UPDATE: UPDATE_FEATURE,
  DELETE: DELETE_FEATURE
});

export default featureReducer;
