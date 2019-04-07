import {takeEvery, fork} from  'redux-saga/effects';
import * as ACTION_TYPES from '../store/actions/actions_types';
import fetchDataAsync from './Todos';

export function* takeFetchData() {
  yield takeEvery(ACTION_TYPES.FETCHED_DATA, fetchDataAsync);
}
export function* takeFetchDatas() {
  yield takeEvery(ACTION_TYPES.FETCHED_DATA, fetchDataAsync);
}

export default function* root() {
  yield fork ([takeFetchData,takeFetchDatas])
  
}
