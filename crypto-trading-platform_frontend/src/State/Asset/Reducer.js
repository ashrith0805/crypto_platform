import * as types from './ActionTypes';
const initstate={
    asset:null,
    userAssets:[],
    loading:false,
    error:null,
    assetDetails:null
}
const assetReducer = (state = initstate, action) => {
    switch (action.type) {
      case types.GET_ASSET_REQUEST:
      case types.GET_USER_ASSETS_REQUEST:
        case types.GET_ASSET_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case types.GET_ASSET_SUCCESS:
        return {
          ...state,
          asset: action.payload,
          loading: false,
          error: null,
        };
        case types.GET_ASSET_DETAILS_SUCCESS:
        return {
          ...state,
          assetDetails: action.payload,
          loading: false,
          error: null,
        };
      case types.GET_USER_ASSETS_SUCCESS:
        return {
          ...state,
          userAssets: action.payload,
          loading: false,
          error: null,
        };
      case types.GET_ASSET_FAILURE:
      case types.GET_USER_ASSETS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default assetReducer;
  