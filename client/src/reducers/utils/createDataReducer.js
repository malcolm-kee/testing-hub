import { createReducer } from './createReducer';

export const createKeyedListDataReducer = ({ SET, APPEND, DELETE }) =>
  createReducer(
    {},
    {
      [SET]: (state, action) =>
        action.payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
      [APPEND]: (state, action) => ({ ...state, [action.payload.id]: action.payload }),
      [DELETE]: (state, action) => {
        const { [action.payload]: _toDelete, ...rest } = state;
        return rest;
      }
    }
  );

export const createKeyedListDataSelector = path => (mapper = f => f) => ({
  getAll(state) {
    if (typeof path === 'undefined') {
      return mapper(state);
    }
    return mapper(state[path]);
  },
  getAllAsList(state) {
    const data = typeof path === 'undefined' ? state : state[path];
    const dataInList = Object.keys(data).map(id => data[id]);
    return mapper(dataInList);
  },
  getOne(state) {
    if (typeof path === 'undefined') {
      return id => mapper(state[id]);
    }
    return id => mapper(state[path][id]);
  }
});

export const createListDataReducer = ({ SET, APPEND, UPDATE, DELETE }) =>
  createReducer([], {
    [SET]: (state, action) => action.payload,
    [APPEND]: (state, action) => state.concat(action.payload),
    [UPDATE]: (state, action) =>
      state.map(item => (item.id === action.payload.id ? action.payload : item)),
    [DELETE]: (state, action) => state.filter(item => item.id !== action.payload)
  });

export const createListDataSelector = path => (mapper = f => f) => ({
  getAll(state) {
    return mapper(state[path]);
  },
  getOne(state) {
    return id => mapper(state[path].find(item => item.id === id));
  }
});

export const createDataReducer = ({ SET, DELETE }) =>
  createReducer(null, {
    [SET]: (state, action) => action.payload,
    [DELETE]: () => undefined
  });
