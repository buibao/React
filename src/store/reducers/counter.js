import * as ACTION_TYPES from '../actions/actions_types'
const initialState = {
    count: 0,
}
const Counter = (state=initialState, action) =>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case ACTION_TYPES.INCREMENT:
            return{
           //   ...state,
               count: state.count +1
            }
        case ACTION_TYPES.DECREMENT:
            return{
             //  ...state,
               count: state.count -1
            }
         default:
         return state 
    }
}
export default Counter;