import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from './../constants/actions';
import {
  createKeyedListDataReducer,
  createKeyedListDataSelector,
  createDataReducer
} from './utils/createDataReducer';
import { reduceReducers } from './utils/reduceReducers';

const featureActionTypes = {
  SET: UPDATE_FEATURE
};

const featureReducer = createDataReducer(featureActionTypes);

const featureParentReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_FEATURE:
      return { ...state, [payload.id]: featureReducer(state, action) };

    default:
      return state;
  }
};

const featuresActionTypes = {
  SET: SET_FEATURES,
  APPEND: ADD_FEATURE,
  DELETE: DELETE_FEATURE
};

const FEATURES_DEFAULT_STATE = {};

export const featuresReducer = reduceReducers(
  (state = FEATURES_DEFAULT_STATE) => state,
  createKeyedListDataReducer(featuresActionTypes),
  featureParentReducer
);

export const featureSelector = {
  ...createKeyedListDataSelector()()
};
