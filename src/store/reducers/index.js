import Reducer1 from './reducer1';
import UserReducer from './user_reducer';
import {reducer as FormReducer} from 'redux-form'
import Counter from './counter';
import TableDataReducer from './tabledata_reducer';
import {combineReducers} from 'redux';
import EventReducer from './eventReducer';
const rootReducer = combineReducers({
    reducer1: Reducer1,
    user_reducer: UserReducer,
    counter: Counter,
    tabledata: TableDataReducer,
    eventsReducer: EventReducer,
    form: FormReducer
})
export default rootReducer;