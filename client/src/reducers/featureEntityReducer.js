import { createSelector } from 'redux-orm';
import { orm } from '../models';
import { SET_FEATURES } from '../constants/actions';

export const featureEntityReducer = (state, action) => {
  let Feature;
  let features;

  const session = orm.session(state);

  switch (action.type) {
    case SET_FEATURES:
      Feature = session.Feature;
      features = action.payload;
      features.forEach(feature => Feature.parse(feature));
      break;

    default:
      break;
  }

  return session.state;
};

export const entitiesSelector = state => state.entities;

export const featureEntityMapper = featureModel => {
  const obj = featureModel.ref;
  return {
    ...obj,
    links: featureModel.links.toRefArray()
  };
};

export const selectFeatureCount = createSelector(orm, entitiesSelector, session =>
  session.Feature.all().count()
);

export const selectFeatures = createSelector(orm, entitiesSelector, session =>
  session.Feature
    .all()
    .toModelArray()
    .map(featureEntityMapper)
);

export const makeSelectOneFeature = featureId =>
  createSelector(orm, entitiesSelector, session =>
    featureEntityMapper(session.Feature.withId(featureId))
  );
