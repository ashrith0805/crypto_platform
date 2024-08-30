
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS,  FETCH_TRENDING_COINS_REQUEST,  FETCH_TRENDING_COINS_SUCCESS,  SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS } from "./ActionTypes";
const initstate={
    coinList:[],
    top50:[],
    coinDetails:null,
    searchCoinList:[],
    coinById:null,
    loading:false,
    error:null,
    trending:[],
    marketChart:{ data:[], loading:false}
}
//ABSTRACTING THE DISPATCH INTO TYPE AND PAYLOAD TO BE PROCESSED BY THIS PUREFUNCTION
const coinReducer=(state=initstate,action)=>{
    switch(action.type){
        case FETCH_COIN_LIST_REQUEST:
        case FETCH_COIN_BY_ID_REQUEST:
        case FETCH_COIN_DETAILS_REQUEST:
        case SEARCH_COIN_REQUEST:
        case FETCH_TOP_50_COINS_REQUEST:
        case FETCH_TRENDING_COINS_REQUEST:
            return {...state,loading:true,error:null};
        case FETCH_MARKET_CHART_REQUEST:
            return{...state,marketChart:{loading:true,data:[]},error:null};
        case FETCH_COIN_LIST_SUCCESS:
            return{...state,coinList:action.payload,loading:false,error:null};
        case FETCH_TOP_50_COINS_SUCCESS:
            return{...state,top50:action.payload,loading:false,error:null};
        case FETCH_MARKET_CHART_SUCCESS:
            return{...state,
                marketChart:{data:action.payload.prices,loading:false},
                error:null,};
         case FETCH_COIN_BY_ID_SUCCESS:
            return {
                ...state,
                coinById: action.payload,
                loading: false,
                error: null,
              };
        case SEARCH_COIN_SUCCESS:
            return{
                ...state,
                searchCoinList:action.payload.coins,
                loading:false,
                error:null
            };
        
        case FETCH_COIN_DETAILS_SUCCESS:
            return{
                ...state,
                coinDetails:action.payload,
                loading:false,
                error:null
            }
        case FETCH_MARKET_CHART_FAILURE:
            return{
                ...state,
                marketChart:{loading:false,data: []},
                error:action.payload
            }
        case FETCH_TRENDING_COINS_SUCCESS:
            return{
                ...state,
                trending:action.payload,
                error:null,
                loading:false
            }
        case FETCH_COIN_LIST_FAILURE:
        case SEARCH_COIN_FAILURE:
        case FETCH_COIN_BY_ID_FAILURE:
        case FETCH_COIN_DETAILS_FAILURE:
        case FETCH_TOP_50_COINS_FAILURE:
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state
        
    }
}
export default coinReducer;


