import * as ACTION_TYPES from '../actions/actions_types'


const initialState = {
    user_text:''
}
const UserReducer = (state=initialState, action) =>{
    // eslint-disable-next-line default-case
    switch (action.type) {
      
        case ACTION_TYPES.USER_INPUT:
            return{
                ...state,
               user_text: action.payload
            }
         default:
         return state 
    }
}
export default UserReducer;