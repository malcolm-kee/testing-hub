import deepFreeze from 'deep-freeze';

import { setFeatures, addFeature, updateFeature, deleteFeature } from './../actions/feature';
import { featureReducer, featureSelector } from './featureReducer';

const feature1 = { id: 2, name: 'object2' };
const feature2 = { id: 123, name: 'object1' };
const features = [feature1, feature2];

test('setFeatures', () => {
  const oldState = [];

  deepFreeze(oldState);

  const reducedState = featureReducer(oldState, setFeatures({ features }));

  expect(featureSelector.getAll(reducedState)).toEqual(features);
  expect(featureSelector.getOne(reducedState)(2)).toEqual(feature1);
});

test('addFeature', () => {
  const oldState = { data: [{ id: 2, name: 'object2' }], loading: true };
  const finalState = {
    data: [{ id: 2, name: 'object2' }, { id: 123, name: 'object1' }],
    loading: false
  };
  const feature = { id: 123, name: 'object1' };

  deepFreeze(oldState);

  expect(featureReducer(oldState, addFeature({ feature }))).toEqual(finalState);
});

test('updateFeature', () => {
  const oldState = {
    data: features,
    loading: true
  };
  const feature = { id: 2, name: 'New Value' };
  const finalState = {
    data: [{ id: 2, name: 'New Value' }, feature2],
    loading: false
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, updateFeature({ feature }))).toEqual(finalState);
});

test('deleteFeature', () => {
  const oldState = {
    data: features,
    loading: true
  };
  const id = feature2.id;
  const finalState = {
    data: [feature1],
    loading: false
  };

  deepFreeze(oldState);

  expect(featureReducer(oldState, deleteFeature({ id }))).toEqual(finalState);
});
