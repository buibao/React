import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import {takeFetchData} from '../sagas';
 const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger,sagaMiddleware)
  );
  sagaMiddleware.run(takeFetchData);
export default store;