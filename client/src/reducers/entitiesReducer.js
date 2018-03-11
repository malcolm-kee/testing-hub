import { createSelector } from 'redux-orm';
import { orm } from '../models';
import { SET_FEATURES, SET_SPRINTS, UPDATE_SPRINT_ITEM_STATUS } from '../constants/actions';

const initialState = orm.getEmptyState();

export const entitiesReducer = (state = initialState, action) => {
  let Feature;
  let SprintItem;
  let features;
  let Sprint;
  let sprints;
  let itemId;
  let status;

  const session = orm.session(state);

  switch (action.type) {
    case SET_FEATURES:
      Feature = session.Feature;
      features = action.payload;
      features.forEach(feature => Feature.parse(feature));
      break;

    case SET_SPRINTS:
      Sprint = session.Sprint;
      sprints = action.payload;
      sprints.forEach(sprint => Sprint.parse(sprint));
      break;

    case UPDATE_SPRINT_ITEM_STATUS:
      SprintItem = session.SprintItem;
      itemId = action.payload.itemId;
      status = action.payload.status;
      SprintItem.withId(itemId).set('status', status);
      break;

    default:
      break;
  }

  return session.state;
};

export const entitiesSelector = state => state.entities;

const featureEntityMapper = featureModel => {
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

export const selectSprintCount = createSelector(orm, entitiesSelector, session =>
  session.Sprint.all().count()
);

export const selectSprintShallow = createSelector(orm, entitiesSelector, session =>
  session.Sprint.all().toRefArray()
);

export const selectSprints = createSelector(orm, entitiesSelector, session =>
  session.Sprint
    .all()
    .toModelArray()
    .map(sprint => {
      const obj = sprint.ref;
      const result = {
        ...obj,
        sprintItems: sprint.sprintItems.toModelArray().map(itemModel => {
          const itemObj = itemModel.ref;
          return {
            ...itemObj,
            feature: featureEntityMapper(itemModel.feature)
          };
        })
      };

      return result;
    })
);
