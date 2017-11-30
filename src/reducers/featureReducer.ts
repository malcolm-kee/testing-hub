import { feature, addFeatureAction, setFeatureAction } from '../definitions/featureDef';
import actionTypes from '../definitions/actionTypes';
import { ActionKeys } from '../definitions/actionKeys';

export interface State {
  byId: Array<string>;
  byKey: Array<feature>;
}

const DEFAULT_STATE: State = {
  byId: [],
  byKey: []
};

const setFeatures = (state: State, action: setFeatureAction) => {
  return {
    byId: action.payload.map(featureItem => featureItem.id),
    byKey: action.payload
  };
};

const addFeature = (state: State, action: addFeatureAction) => {
  return {
    byId: state.byId.concat(action.payload.id),
    byKey: state.byKey.concat(action.payload)
  };
};

const featureReducer = (state: State = DEFAULT_STATE, action: actionTypes) => {
  switch (action.type) {
    case ActionKeys.SET_FEATURES:
      return setFeatures(state, action);
    case ActionKeys.ADD_FEATURE:
      return addFeature(state, action);
    default:
      return state;
  }
};

export default featureReducer;
