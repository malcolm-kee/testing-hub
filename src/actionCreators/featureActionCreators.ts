import ActionTypes from '../definitions/ActionTypes';
import { ActionKeys } from '../definitions/ActionKeys';
import {
  Feature,
  SetFeatureAction,
  AddFeatureAction,
  UpdateFeatureAction,
  DeleteFeatureAction
} from '../definitions/FeatureDef';

function setFeatures(features: Array<Feature>): SetFeatureAction {
  return { type: ActionKeys.SET_FEATURES, payload: features };
}

function addFeature(feature: Feature): AddFeatureAction {
  return { type: ActionKeys.ADD_FEATURE, payload: feature };
}

function updateFeature(feature: Feature): UpdateFeatureAction {
  return { type: ActionKeys.UPDATE_FEATURE, payload: feature };
}

function deleteFeature(featureId: string): DeleteFeatureAction {
  return { type: ActionKeys.DELETE_FEATURE, payload: featureId };
}

export default { setFeatures, addFeature, updateFeature, deleteFeature };
