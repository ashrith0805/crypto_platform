import api, { API_BASE_URL } from "@/config/api";
import * as types from "./ActionTypes"
export const getUserWatchList = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_WATCHLIST_REQUEST }); 
    try {
      const response = await api.get("/api/watchlist/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_USER_WATCHLIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.GET_USER_WATCHLIST_FAILURE,
        error: error.message,
      });
    }
  };

  export const addCoinToWatchList = ({jwt,coinId}) => async (dispatch) => {
    dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });
    try {
      //for patch or put must have body as second parameter for the axios request!!
      console.log(jwt)
      const response = await api.patch(`/api/watchlist/add/coin/${coinId}`,{}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      dispatch({
        type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
        error: error.message,
      });
    }
  };

  export const removeCoinFromWatchList = ({jwt,coinId}) => async (dispatch) => {
    dispatch({ type: types.REMOVE_COIN_WATCHLIST_REQUEST });
  
    try {
      const response = await api.patch(`/api/watchlist/remove/coin/${coinId}`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      dispatch({
        type: types.REMOVE_COIN_WATCHLIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.REMOVE_COIN_WATCHLIST_FAILURE,
        error: error.message,
      });
    }
  };