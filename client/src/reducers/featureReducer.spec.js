import deepFreeze from 'deep-freeze';

import { setFeatures, addFeature, updateFeature, deleteFeature } from './../featureActionCreators';
import featureReducer from './featureReducer';

test('setFeatures', () => {
	const oldState = [];
	const finalState = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];
	const features = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];

	deepFreeze(oldState);

	expect(featureReducer(oldState, setFeatures({ features }))).toEqual(finalState);
});

test('addFeature', () => {
	const oldState = [{ id: 2, name: 'object2' }];
	const finalState = [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }];
	const feature = { id: 123, name: 'object1' };

	deepFreeze(oldState);

	expect(featureReducer(oldState, addFeature({ feature }))).toEqual(finalState);
});

test('updateFeature', () => {
	const oldState = [{ id: 2, name: 'oldValue' }, { id: 123, name: 'object1' }];
	const finalState = [{ id: 2, name: 'New Value' }, { id: 123, name: 'object1' }];
	const feature = { id: 2, name: 'New Value' };

	deepFreeze(oldState);

	expect(featureReducer(oldState, updateFeature({ feature }))).toEqual(finalState);
});

test('deleteFeature', () => {
	const oldState = [{ id: 123, name: 'object1' }, { id: 2, name: 'object2' }];
	const finalState = [{ id: 2, name: 'object2' }];
	const id = 123;

	deepFreeze(oldState);

	expect(featureReducer(oldState, deleteFeature({ id }))).toEqual(finalState);
});
