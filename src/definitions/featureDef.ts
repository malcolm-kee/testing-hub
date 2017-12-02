import { ActionKeys as keys } from './ActionKeys';

interface FeatureLink {
  env: string;
  url: string;
}

export interface Feature {
  id: string;
  name: string;
  details?: string;
  links: Array<FeatureLink>;
  requireLogin: boolean;
  createdBy: string;
  lastUpdatedBy?: string;
}

export interface SetFeatureAction {
  readonly type: keys.SET_FEATURES;
  readonly payload: Array<Feature>;
}

export interface AddFeatureAction {
  readonly type: keys.ADD_FEATURE;
  readonly payload: Feature;
}

export interface UpdateFeatureAction {
  readonly type: keys.UPDATE_FEATURE;
  readonly payload: Feature;
}

export interface DeleteFeatureAction {
  readonly type: keys.DELETE_FEATURE;
  readonly payload: string;
}
