import * as ACTION_TYPES from '../actions/actions_types'

const initialState = {
    data:'',
    loading:false,
    error:false,
};
const TableDataReducer = (state=initialState, action) =>{
    // eslint-disable-next-line default-case
    switch (action.type) {
      
        case ACTION_TYPES.REQUESTED_DATA:
            return{
             //  ...state,
               data: '',
               loading:true,
               error:false
            };
        case ACTION_TYPES.REQUESTED_DATA_SUCCEEDED:
            return{
            //   ...state,
               data: action.data,
               loading:true,
               error:false
            };
        case ACTION_TYPES.REQUESTED_DATA_FAILED:
            return{
             //   ...state,
                data: '',
               loading:false,
               error:true
            };

         default:
         return state 
    }
}
export default TableDataReducer;