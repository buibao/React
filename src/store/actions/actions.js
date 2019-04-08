import * as ACTION_TYPES from './actions_types'
 
export const SUCCESS = {
     type: ACTION_TYPES.SUCCESS
 }
 export const FAILURE = {
    type: ACTION_TYPES.FAILURE
}

export const success = () =>{ 
    return {
      type:  ACTION_TYPES.SUCCESS
    }
}
export const failure = () =>{ 
    return {
        type: ACTION_TYPES.FAILURE
    }
}
export const user_input = (text) => {
    return {
        type: ACTION_TYPES.USER_INPUT,
        payload: text
    }
}
export const INCREMENT = {
    type: ACTION_TYPES.INCREMENT
}
export const DECREMENT = {
    type: ACTION_TYPES.DECREMENT
}

// Action Creators Get Data API
export const requestData = () =>{
    return {
        type: ACTION_TYPES.REQUESTED_DATA
    }
}
export const requestDataSuccess = (data) =>{
    return {
        type: ACTION_TYPES.REQUESTED_DATA_SUCCEEDED,
        data: data
    }
}
export const requestDataError = () =>{
    return {
        type: ACTION_TYPES.REQUESTED_DATA_FAILED
    }
}
export const FETCHED_DATA = {
    type: ACTION_TYPES.FETCHED_DATA
}
//
export const createEvent = (event) =>{
    return {
        type: ACTION_TYPES.CREATE_EVENT,
        payload: event
        
    }
}

export const updateEvent = (event) =>{
    return {
        type: ACTION_TYPES.UPDATE_EVENT,
        payload: event
        
    }
}

export const  deleteEvent = (eventId) =>{
    return {
        type: ACTION_TYPES.DELETE_EVENT,
        payload: eventId
    }
}
