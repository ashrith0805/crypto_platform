import * as types from './ActionTypes';
const initstate={
    order:null,
    orders:[],
    loading:false,
    error:null
}
const orderReducer=(state=initstate,action)=>{
    switch(action.type){
        case types.PAY_ORDER_REQUEST:
        case types.GET_ALL_ORDERS_REQUEST:
        case types.GET_ORDER_REQUEST:
            return{
                ...state,
                loading:true,
                error:false
            }
        case types.PAY_ORDER_SUCCESS:
        case types.GET_ORDER_SUCCESS:
            return{
                ...state,
                order:action.payload,
                loading:false,
                error:null
            }
        case types.GET_ALL_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.payload,
                loading:false,
                error:null
            }
        case types.PAY_ORDER_FAILURE:
        case types.GET_ALL_ORDERS_FAILURE:
        case types.GET_ORDER_FAILURE:
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return initstate
        
    }
}
export default orderReducer