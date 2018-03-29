import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { INVOKE_LOAD_FEATURE } from '../constants/actions';
import { getAll } from '../service/featureService';
import { loadingFeature, setFeatures, loadFeatureError } from '../actions/feature';

export function* invokeLoadFeatureSaga() {
  yield put(loadingFeature());

  try {
    const features = yield call(getAll);
    yield put(setFeatures({ features }));
  } catch (e) {
    yield put(loadFeatureError(e));
  }
}

function* watchInvokeLoadFeature() {
  yield takeLatest(INVOKE_LOAD_FEATURE, invokeLoadFeatureSaga);
}

export function* featureSaga() {
  yield all([fork(watchInvokeLoadFeature)]);
}
