import { ActionKeys as keys } from './actionKeys';

interface featureLink {
  env: string;
  url: string;
}

export interface feature {
  id: string;
  name: string;
  details: string;
  links: Array<featureLink>;
  requireLogin: boolean;
  createdBy: string;
  lastUpdatedBy: string;
}

export interface setFeatureAction {
  readonly type: keys.SET_FEATURES;
  readonly payload: Array<feature>;
}

export interface addFeatureAction {
  readonly type: keys.ADD_FEATURE;
  readonly payload: feature;
}
