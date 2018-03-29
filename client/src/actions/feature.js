import { createPendingAction, createEmptyAction, createErrorAction } from './utils';
import { getAll, create, update, remove } from '../service/featureService';

import {
  SET_FEATURES,
  INVOKE_LOAD_FEATURE,
  LOADING_FEATURES,
  LOAD_FEATURE_ERROR,
  ADD_FEATURE,
  ADDING_FEATURE,
  ADD_FEATURE_ERROR,
  UPDATE_FEATURE,
  UPDATING_FEATURE,
  UPDATE_FEATURE_ERROR,
  DELETE_FEATURE,
  DELETING_FEATURE,
  DELETE_FEATURE_ERROR
} from '../constants/actions';

export const setFeatures = ({ features }) => ({ type: SET_FEATURES, payload: features });

export const loadingFeature = createPendingAction(LOADING_FEATURES);

export const loadFeatureError = createErrorAction(LOAD_FEATURE_ERROR);

export const addFeature = ({ feature }) => ({ type: ADD_FEATURE, payload: feature });

export const addingFeature = createPendingAction(ADDING_FEATURE);

export const addFeatureError = createErrorAction(ADD_FEATURE_ERROR);

export const updateFeature = ({ feature }) => ({ type: UPDATE_FEATURE, payload: feature });

export const updatingFeature = createPendingAction(UPDATING_FEATURE);

export const updateFeatureError = createErrorAction(UPDATE_FEATURE_ERROR);

export const deleteFeature = ({ id }) => ({ type: DELETE_FEATURE, payload: id.toString() });

export const deletingFeature = createPendingAction(DELETING_FEATURE);

export const deleteFeatureError = createErrorAction(DELETE_FEATURE_ERROR);

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
  dispatch(addingFeature());

  create(feature)
    .then(featureWithId => {
      dispatch(addFeature({ feature: featureWithId }));
    })
    .catch(err => {
      dispatch(addFeatureError(err));
    });
};

export const changingFeature = feature => dispatch => {
  dispatch(updatingFeature(feature.id));

  update(feature)
    .then(() => {
      dispatch(updateFeature({ feature }));
    })
    .catch(err => {
      dispatch(updateFeatureError(err, feature.id));
    });
};

export const removingFeature = id => dispatch => {
  dispatch(deletingFeature(id));

  remove({ id })
    .then(() => {
      dispatch(deleteFeature({ id }));
    })
    .catch(err => {
      dispatch(deleteFeatureError(err, id));
    });
};

/* saga action */
export const invokeLoadFeature = createEmptyAction(INVOKE_LOAD_FEATURE);
