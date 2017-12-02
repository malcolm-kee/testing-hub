import {
  Feature,
  AddFeatureAction,
  SetFeatureAction,
  UpdateFeatureAction,
  DeleteFeatureAction
} from '../definitions/FeatureDef';
import ActionTypes from '../definitions/ActionTypes';
import { ActionKeys } from '../definitions/ActionKeys';

export interface State {
  byId: Array<string>;
  byHash: {
    [index: string]: Feature;
  };
}

const DEFAULT_STATE: State = {
  byId: [],
  byHash: {}
};

const setFeatures = (state: State, action: SetFeatureAction): State => {
  const features = action.payload;
  const hash = features.reduce((hashObj, featureItem) => {
    return { ...hashObj, [featureItem.id]: featureItem };
  }, {});

  return {
    byId: features.map(featureItem => featureItem.id),
    byHash: hash
  };
};

const addFeature = (state: State, action: AddFeatureAction): State => {
  const feature = action.payload;
  return {
    byId: state.byId.concat(feature.id),
    byHash: {
      ...state.byHash,
      [feature.id]: feature
    }
  };
};

const updateFeature = (state: State, action: UpdateFeatureAction): State => {
  const feature = action.payload;
  return {
    byId: [...state.byId],
    byHash: {
      ...state.byHash,
      [feature.id]: feature
    }
  };
};

const deleteFeature = (state: State, action: DeleteFeatureAction): State => {
  const idToDelete = action.payload;
  return {
    byId: state.byId.filter(id => id !== idToDelete),
    byHash: Object.keys(state.byHash).reduce((hashObj, key) => {
      if (key !== idToDelete) {
        return {
          ...hashObj,
          [key]: state.byHash[key]
        };
      }
      return hashObj;
    }, {})
  };
};

const featureReducer = (state: State = DEFAULT_STATE, action: ActionTypes): State => {
  switch (action.type) {
    case ActionKeys.SET_FEATURES:
      return setFeatures(state, action);
    case ActionKeys.ADD_FEATURE:
      return addFeature(state, action);
    case ActionKeys.UPDATE_FEATURE:
      return updateFeature(state, action);
    case ActionKeys.DELETE_FEATURE:
      return deleteFeature(state, action);
    default:
      return state;
  }
};

export default featureReducer;
