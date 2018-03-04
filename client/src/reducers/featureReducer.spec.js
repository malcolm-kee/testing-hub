import deepFreeze from 'deep-freeze';

import { setFeatures, addFeature, updateFeature, deleteFeature } from './../actions/feature';
import { featureReducer, featureSelector } from './featureReducer';

const feature1 = { id: 2, name: 'object2' };
const feature2 = { id: 123, name: 'object1' };
const features = [feature1, feature2];

test('setFeatures', () => {
  const oldState = [];

  const finalState = features;

  deepFreeze(oldState);

  const reducedState = featureReducer(oldState, setFeatures({ features }));

  expect(reducedState).toEqual(finalState);
  expect(featureSelector.getAll(reducedState)).toEqual(features);
  expect(featureSelector.getOne(reducedState)(2)).toEqual(feature1);
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
