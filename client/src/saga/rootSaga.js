import { all, fork } from 'redux-saga/effects';
import { featureSaga } from './featureSaga';

export function* rootSaga() {
  yield all([fork(featureSaga)]);
}

export default rootSaga;
