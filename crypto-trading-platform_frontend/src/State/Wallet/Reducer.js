import * as types from "./ActionTypes";
const initState={
    userWallet: {},
    loading: false,
    error: null,
    transactions: [],
};

const walletReducer=(state=initState,action)=>{
    switch(action.type){
        case types.GET_USER_WALLET_REQUEST:
        case types.DEPOSIT_MONEY_REQUEST:
        case types.TRANSFER_MONEY_REQUEST:
        case types.GET_WALLET_TRANSACTION_REQUEST:
            return({...state,loading:true,error:null})
        
        case types.GET_USER_WALLET_SUCCESS:
        case types.TRANSFER_MONEY_SUCCESS:
        case types.DEPOSIT_MONEY_SUCCESS:
            return{
                ...state,
                userWallet:action.payload,
                loading:false,
                error:null
            };
        case types.GET_USER_WALLET_FAILURE:
        case types.DEPOSIT_MONEY_FAILURE:
        case types.TRANSFER_MONEY_FAILURE:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case types.GET_WALLET_TRANSACTION_SUCCESS:
            return {
                  ...state,
                  transactions: action.payload,
                  loading: false,
                  error: null,
                };
        default:
            return state        
    }
}
/*
must return state not initial state as this will reset the entire state losing all the data
*/
export default walletReducer;