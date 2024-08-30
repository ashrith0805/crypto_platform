import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, GET_USER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_FAILURE, GET_USER_SUCCESS, LOG_OUT_SUCCESS } from "./ActionTypes"
const initstate={
    user:null,
    loading:false,
    error:null,
    jwt:null
}

/* writing pure functions to update state based on actions
*/
/*
switch case on the type of action( objects that describe events and changes)
*/
const authReducer=(state=initstate,action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {...state,loading:true,error:null}

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state,loading:false,error:null,jwt:action.payload}
        
        case GET_USER_SUCCESS:
            return {...state,user:action.payload,loading:false,error:null}

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return{...state,loading:false,error:action.payload}
        case LOG_OUT_SUCCESS:
            return {initstate}
        default:
            return state
    }
}
export default authReducer
/*
initstate is the initial state associated with authReducer is your redux setu.
it defines the fault values for the authentication related state properties
authReducer is a pure function that takes the current state and an action.
based on the action type from the dispatch the state is updated approprirately 
eg in const {auth}=useSelector(selector=>selector) this can be used to extract info from the stae
*/
/*
when you logout the logut event hanlder clears the local storage and 
resets to the initial auth state which in the app.jsx sets auth to null so
therefore only the auth component is rendered rather than tha react router component
UI DYNAMICALLY UPDATES

*/