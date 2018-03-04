import { createReducer } from './createReducer';

export const createLoadingReducer = ({ SET, APPEND, UPDATE, DELETE, LOADING, ERROR }) =>
  createReducer([], {
    [SET]: () => false,
    [APPEND]: () => false,
    [UPDATE]: () => false,
    [DELETE]: () => false,
    [ERROR]: () => false,
    [LOADING]: () => true
  });

export const createLoadingSelector = path => ({
  getLoadingState(state) {
    return state[path];
  }
});
