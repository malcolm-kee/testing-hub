import deepFreeze from 'deep-freeze';

import { setSprints, addSprint, updateSprint, deleteSprint } from './../src/sprintActionCreators';
import sprintReducer from './../src/sprintReducer';

test('setSprints', () => {
	const oldState = [];
	const finalState = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];
	const sprints = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];

	deepFreeze(oldState);

	expect(sprintReducer(oldState, setSprints({ sprints }))).toEqual(finalState);
});

test('addSprint', () => {
	const oldState = [{ id: 2, name: 'object2' }];
	const finalState = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];
	const sprint = { id: 123, name: 'object1' };

	deepFreeze(oldState);

	expect(sprintReducer(oldState, addSprint({ sprint }))).toEqual(finalState);
});

test('updateSprint', () => {
	const oldState = [{ id: 2, name: 'oldValue' }, { id: 123, name: 'object1' }];
	const finalState = [{ id: 2, name: 'New Value' }, { id: 123, name: 'object1' }];
	const sprint = { id: 2, name: 'New Value' };

	deepFreeze(oldState);

	expect(sprintReducer(oldState, updateSprint({ sprint }))).toEqual(finalState);
});

test('deleteSprint', () => {
	const oldState = [{ id: 123, name: 'object1' }, { id: 2, name: 'object2' }];
	const finalState = [{ id: 2, name: 'object2' }];
	const id = 123;

	deepFreeze(oldState);

	expect(sprintReducer(oldState, deleteSprint({ id }))).toEqual(finalState);
});
