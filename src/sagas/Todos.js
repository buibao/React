
import {put,call} from  'redux-saga/effects';
import * as ACTIONS from '../store/actions/actions';
import fetchTodos  from '../api/todos';

export function* fetchDataAsync() {
  try {
    yield put(ACTIONS.requestData());
    const data = yield call(() => {
      return fetchTodos;
      }
    );
    yield put(ACTIONS.requestDataSuccess(data));
  } catch (error) {
    yield put(ACTIONS.requestDataError());
  }
}

export default fetchDataAsync;