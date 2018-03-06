import { createReducer } from './createReducer';

export const createLoadingReducer = ({ SET, APPEND, UPDATE, DELETE, LOADING, ERROR }) =>
  createReducer(false, {
    [SET]: () => false,
    [APPEND]: () => false,
    [UPDATE]: () => false,
    [DELETE]: () => false,
    [ERROR]: () => false,
    [LOADING]: () => true
  });

export const createLoadingSelector = path => (mapper = f => f) => ({
  getLoadingState(state) {
    if (typeof path === 'undefined') {
      return mapper(state);
    }
    return mapper(state[path]);
  }
});
