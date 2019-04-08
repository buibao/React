import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import {takeFetchData} from '../sagas';
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase';
import {reduxFirestore,getFirestore} from 'redux-firestore'
const rrfConfig = {
  userProfile:'user',
  attachAuthIsReady:true,
  userFiretoreForProfile:true

}

 const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger,sagaMiddleware)
  );
  sagaMiddleware.run(takeFetchData);
export default store;