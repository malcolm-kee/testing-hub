import { SHOW_CLOSE_TO_UPDATE } from '../constants/actions';

const DEFAULT_STATE = {
  hasNewUpdate: false
};

export const uiReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SHOW_CLOSE_TO_UPDATE:
      return {
        ...state,
        hasNewUpdate: true
      };

    default:
      return state;
  }
};

export const selectHasNewUpdate = state => state.hasNewUpdate;
