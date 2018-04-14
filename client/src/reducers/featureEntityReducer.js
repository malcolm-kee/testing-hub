import { createSelector } from 'redux-orm';
import { orm } from '../models';
import { SET_FEATURES, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE } from '../constants/actions';

export const featureEntityReducer = (state, action) => {
  let Feature;
  let features;
  let featureData;
  let featureId;

  const session = orm.session(state);

  switch (action.type) {
    case SET_FEATURES:
      Feature = session.Feature;
      features = action.payload;
      features.forEach(feature => Feature.parse(feature));
      break;

    case ADD_FEATURE:
      Feature = session.Feature;
      featureData = action.payload;
      Feature.parse(featureData);
      break;

    case UPDATE_FEATURE:
      Feature = session.Feature;
      featureData = action.payload;
      Feature.withId(featureData.id).update(featureData);
      break;

    case DELETE_FEATURE:
      Feature = session.Feature;
      featureId = action.payload;
      Feature.withId(featureId).delete();
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

export const selectFeatureCount = createSelector(orm, entitiesSelector, session => {
  try {
    return session.Feature.all().count();
  } catch (e) {
    return 0;
  }
});

export const selectFeatures = createSelector(orm, entitiesSelector, session => {
  try {
    return session.Feature
      .all()
      .toModelArray()
      .map(featureEntityMapper);
  } catch (e) {
    return [];
  }
});

export const makeSelectOneFeature = featureId =>
  createSelector(orm, entitiesSelector, session =>
    featureEntityMapper(session.Feature.withId(featureId))
  );
