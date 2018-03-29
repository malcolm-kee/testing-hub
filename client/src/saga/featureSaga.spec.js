import { put, call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { loadingFeature, setFeatures } from '../actions/feature';
import { invokeLoadFeatureSaga } from './featureSaga';
import { getAll } from '../service/featureService';

describe('invokeLoadFeatureSaga', () => {
  const features = ['1', '2'];

  const it = sagaHelper(invokeLoadFeatureSaga());

  it('should put loading features', result => {
    expect(result).toEqual(put(loadingFeature()));
  });

  it('should call getAll features', result => {
    expect(result).toEqual(call(getAll));

    return features;
  });

  it('should put setFeatures', result => {
    expect(result).toEqual(put(setFeatures({ features })));
  });
});
