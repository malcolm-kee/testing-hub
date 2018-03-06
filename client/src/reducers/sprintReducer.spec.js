import deepFreeze from 'deep-freeze';

import { setSprints, addSprint, updateSprint, deleteSprint } from './../actions/sprint';
import { sprintReducer } from './sprintReducer';

const sprint1 = { id: 2, name: 'object2' };
const sprint2 = { id: 123, name: 'object1' };
const sprints = {
  [sprint1.id]: sprint1,
  [sprint2.id]: sprint2
};

test('setSprints', () => {
  const oldState = {};
  const finalState = sprints;

  deepFreeze(oldState);

  expect(sprintReducer(oldState, setSprints({ sprints: [sprint1, sprint2] }))).toEqual(finalState);
});

test('addSprint', () => {
  const oldState = {
    [sprint1.id]: sprint1
  };
  const finalState = sprints;

  deepFreeze(oldState);

  expect(sprintReducer(oldState, addSprint({ sprint: sprint2 }))).toEqual(finalState);
});

test('updateSprint', () => {
  const oldState = sprints;
  const sprint1Updated = { id: 2, name: 'New Value' };
  const finalState = {
    [sprint1.id]: sprint1Updated,
    [sprint2.id]: sprint2
  };

  deepFreeze(oldState);

  expect(sprintReducer(oldState, updateSprint({ sprint: sprint1Updated }))).toEqual(finalState);
});

test('deleteSprint', () => {
  const oldState = sprints;
  const finalState = {
    [sprint2.id]: sprint2
  };
  const id = sprint1.id;

  deepFreeze(oldState);

  expect(sprintReducer(oldState, deleteSprint({ id }))).toEqual(finalState);
});
