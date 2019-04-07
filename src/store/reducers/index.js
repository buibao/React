import Reducer1 from './reducer1';
import UserReducer from './user_reducer';
import Counter from './counter';
import TableDataReducer from './tabledata_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    reducer1: Reducer1,
    user_reducer: UserReducer,
    counter: Counter,
    tabledata: TableDataReducer
})
export default rootReducer;