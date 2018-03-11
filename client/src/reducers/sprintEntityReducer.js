import { createSelector } from 'redux-orm';
import { orm } from '../models';
import { SET_SPRINTS, UPDATE_SPRINT_ITEM_STATUS } from '../constants/actions';

export const sprintEntityReducer = (state, action) => {
  let SprintItem;
  let Sprint;
  let sprints;
  let itemId;
  let status;

  const session = orm.session(state);

  switch (action.type) {
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

export const selectSprintCount = createSelector(orm, entitiesSelector, session =>
  session.Sprint.all().count()
);

export const selectSprintShallow = createSelector(orm, entitiesSelector, session =>
  session.Sprint.all().toRefArray()
);
