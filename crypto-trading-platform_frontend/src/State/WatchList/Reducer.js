import * as types from './ActionTypes';
const initstate={
    watchlist: null,
  loading: false,
  error: null,
  items: [],
}
const watchListReducer=(state=initstate,action)=>{
    switch(action.type){
        case types.GET_USER_WATCHLIST_REQUEST:
        case types.ADD_COIN_TO_WATCHLIST_REQUEST:
        case types.REMOVE_COIN_WATCHLIST_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            
            }
        case types.GET_USER_WATCHLIST_SUCCESS:
        case types.ADD_COIN_TO_WATCHLIST_SUCCESS:
        case types.REMOVE_COIN_WATCHLIST_SUCCESS:
            return{
                ...state,
                watchlist:action.payload,
                error:null,
                loading:false
            }
        case types.GET_USER_WATCHLIST_SUCCESS:
        case types.ADD_COIN_TO_WATCHLIST_SUCCESS:
        case types.REMOVE_COIN_WATCHLIST_SUCCESS:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        default:
            return state
    }
}
export default watchListReducer