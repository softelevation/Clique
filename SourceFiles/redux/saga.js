import {all} from 'redux-saga/effects';
import {paymentWatcher} from './payments/saga';
export default function* rootSaga() {
  yield all([paymentWatcher()]);
}
