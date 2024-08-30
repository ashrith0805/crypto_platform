import * as types from "./ActionTypes";
import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAILURE,
    WITHDRAWAL_PROCEED_REQUEST,
    WITHDRAWAL_PROCEED_SUCCESS,
    WITHDRAWAL_PROCEED_FAILURE,
    GET_WITHDRAWAL_HISTORY_REQUEST,
    GET_WITHDRAWAL_HISTORY_SUCCESS,
    GET_WITHDRAWAL_HISTORY_FAILURE,
    ADD_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_SUCCESS,
    GET_WITHDRAWAL_REQUEST_SUCCESS,
    GET_WITHDRAWAL_REQUEST_FAILURE,
    GET_WITHDRAWAL_REQUEST_REQUEST,
  } from "./ActionTypes";
const initstate={
    withdrawal:null,
    history:[],
    loading:false,
    error:null,
    paymentDetails:null,
    requests:[]
}
//const for constant memory reference to the object
const withdrawalReducer=(state=initstate,action)=>{
    switch(action.type){
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_WITHDRAWAL_REQUEST_REQUEST:
            return{...state,
                loading:true,
                error:null}
        case WITHDRAWAL_SUCCESS:
            return{
                ...state,
                withdrawal:action.payload,
                error:null,
                loading:false
            }
        case ADD_PAYMENT_DETAILS_SUCCESS:
        case GET_PAYMENT_DETAILS_SUCCESS:
            return{
                ...state,
                paymentDetails:action.payload,
                error:null,
                loading:false
            }
        case WITHDRAWAL_PROCEED_SUCCESS: //for admin
            return {
                ...state,
                requests: state.requests.map((item)=>{
                    item.id==action.payload.id?action.payload:item}),
                loading:false,
                error:null
                }
        case GET_WITHDRAWAL_HISTORY_SUCCESS: //for user
            return{
                ...state,
                history:action.payload,
                loading:false,
                error:null
            }
        case GET_WITHDRAWAL_REQUEST_SUCCESS: //requests for admin to deal with
            return{
                ...state,
                requests:action.payload,
                error:null,
                loading:false
            }
        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_WITHDRAWAL_REQUEST_FAILURE:
            return {
                 ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return initstate;
    }

}
export default withdrawalReducer