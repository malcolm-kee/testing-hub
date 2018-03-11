import { createSelector } from 'redux-orm';
import { orm } from '../models';
import { reduceReducers } from './utils/reduceReducers';
import { featureEntityReducer, featureEntityMapper } from './featureEntityReducer';
import { sprintEntityReducer } from './sprintEntityReducer';

export { selectFeatures, selectFeatureCount, makeSelectOneFeature } from './featureEntityReducer';
export { selectSprintShallow, selectSprintCount } from './sprintEntityReducer';

const initialState = orm.getEmptyState();

export const entitiesReducer = reduceReducers(
  (state = initialState) => state,
  featureEntityReducer,
  sprintEntityReducer
);

export const entitiesSelector = state => state.entities;

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
