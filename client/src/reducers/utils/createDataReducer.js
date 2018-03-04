import { createReducer } from './createReducer';

export const createListDataReducer = ({ SET, APPEND, UPDATE, DELETE }) =>
  createReducer([], {
    [SET]: (state, action) => action.payload,
    [APPEND]: (state, action) => state.concat(action.payload),
    [UPDATE]: (state, action) =>
      state.map(item => (item.id === action.payload.id ? action.payload : item)),
    [DELETE]: (state, action) => state.filter(item => item.id !== action.payload)
  });

export const createListDataSelector = () => ({
  getAll(state) {
    return state;
  },
  getOne(state) {
    return id => state.find(item => item.id === id);
  }
});

export default createListDataReducer;
