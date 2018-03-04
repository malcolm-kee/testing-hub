import { getAll, create } from '../service/featureService';

import {
  SET_FEATURES,
  ADD_FEATURE,
  UPDATE_FEATURE,
  DELETE_FEATURE,
  LOADING_FEATURE,
  LOAD_FEATURE_ERROR
} from '../constants/actions';

export const setFeatures = ({ features }) => ({ type: SET_FEATURES, payload: features });

export const addFeature = ({ feature }) => ({ type: ADD_FEATURE, payload: feature });

export const updateFeature = ({ feature }) => ({ type: UPDATE_FEATURE, payload: feature });

export const deleteFeature = ({ id }) => ({ type: DELETE_FEATURE, payload: id });

export const loadingFeature = () => ({ type: LOADING_FEATURE });

export const loadFeatureError = error => {
  let errorMsg = 'Unknown Error';

  if (typeof error === 'string') {
    errorMsg = error;
  } else if (error !== null && typeof error === 'object' && error.message === 'string') {
    errorMsg = error.message;
  }

  return {
    type: LOAD_FEATURE_ERROR,
    payload: errorMsg
  };
};

/*
* Thunk Actions
*/
export const loadFeatures = () => dispatch => {
  dispatch(loadingFeature());

  getAll()
    .then(features => {
      dispatch(setFeatures({ features }));
    })
    .catch(err => {
      dispatch(loadFeatureError(err));
    });
};

export const creatingFeature = feature => dispatch => {
  dispatch(loadingFeature());

  create(feature)
    .then(featureWithId => {
      dispatch(addFeature({ feature: featureWithId }));
    })
    .catch(err => {
      dispatch(loadFeatureError(err));
    });
};
