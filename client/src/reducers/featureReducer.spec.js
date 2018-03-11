import deepFreeze from 'deep-freeze';

import { setFeatures, addFeature, updateFeature, deleteFeature } from '../actions/feature';
import { featuresReducer } from './featureReducer';

const feature1 = { id: 2, name: 'object2' };
const feature2 = { id: 123, name: 'object1' };
const features = [feature1, feature2];

test('setFeatures', () => {
  const oldState = {};

  deepFreeze(oldState);

  const reducedState = featuresReducer(oldState, setFeatures({ features }));

  expect(reducedState).toEqual({
    [feature1.id]: feature1,
    [feature2.id]: feature2
  });

  // expect(featureSelector.getAllAsList(reducedState)).toEqual(features);
  // expect(featureSelector.getOne(reducedState)(2)).toEqual(feature1);
});

test('addFeature', () => {
  const oldState = { '2': { id: 2, name: 'object2' } };
  const finalState = {
    '2': { id: 2, name: 'object2' },
    '123': { id: 123, name: 'object1' }
  };
  const feature = { id: 123, name: 'object1' };

  deepFreeze(oldState);

  expect(featuresReducer(oldState, addFeature({ feature }))).toEqual(finalState);
});

test('updateFeature', () => {
  const oldState = {
    [feature1.id]: feature1,
    [feature2.id]: feature2
  };
  const feature = { id: 2, name: 'New Value' };
  const finalState = { '2': { id: 2, name: 'New Value' }, [feature2.id]: feature2 };

  deepFreeze(oldState);

  expect(featuresReducer(oldState, updateFeature({ feature }))).toEqual(finalState);
});

test('deleteFeature', () => {
  const oldState = {
    [feature1.id]: feature1,
    [feature2.id]: feature2
  };
  const id = feature2.id;
  const finalState = {
    [feature1.id]: feature1
  };

  deepFreeze(oldState);

  expect(featuresReducer(oldState, deleteFeature({ id }))).toEqual(finalState);
});
