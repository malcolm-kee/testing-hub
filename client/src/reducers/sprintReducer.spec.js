import deepFreeze from 'deep-freeze';

import { setSprints, addSprint, updateSprint, deleteSprint } from './../actions/sprint';
import { sprintReducer } from './sprintReducer';

const sprint1 = { id: 2, name: 'object2' };
const sprint2 = { id: 123, name: 'object1' };
const sprints = [sprint1, sprint2];

test('setSprints', () => {
  const oldState = {
    data: [],
    loading: true
  };
  const finalState = {
    data: sprints,
    loading: false
  };

  deepFreeze(oldState);

  expect(sprintReducer(oldState, setSprints({ sprints }))).toEqual(finalState);
});

test('addSprint', () => {
  const oldState = {
    data: [sprint1],
    loading: true
  };
  const finalState = {
    data: [sprint1, sprint2],
    loading: false
  };

  deepFreeze(oldState);

  expect(sprintReducer(oldState, addSprint({ sprint: sprint2 }))).toEqual(finalState);
});

test('updateSprint', () => {
  const oldState = {
    data: sprints,
    loading: true
  };
  const sprint1Updated = { id: 2, name: 'New Value' };
  const finalState = {
    data: [sprint1Updated, sprint2],
    loading: false
  };

  deepFreeze(oldState);

  expect(sprintReducer(oldState, updateSprint({ sprint: sprint1Updated }))).toEqual(finalState);
});

test('deleteSprint', () => {
  const oldState = {
    data: sprints,
    loading: true
  };
  const finalState = {
    data: [sprint2],
    loading: false
  };
  const id = sprint1.id;

  deepFreeze(oldState);

  expect(sprintReducer(oldState, deleteSprint({ id }))).toEqual(finalState);
});
