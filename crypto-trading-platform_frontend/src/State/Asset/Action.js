import * as types from "./ActionTypes"
import api, { API_BASE_URL } from "@/config/api";
export const getAssetById = ({jwt,assetId}) => async (dispatch) => {
    dispatch({ type:types.GET_ASSET_REQUEST });
    try {
      const response = await api.get(`/api/assets/${assetId}`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.GET_ASSET_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.GET_ASSET_FAILURE, payload: error.message });
    }
  };

  export const getUserAssets = ({jwt}) => async (dispatch) => {
    dispatch({ type:types.GET_USER_ASSETS_REQUEST });
    try {
      const response = await api.get(`/api/assets`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.GET_USER_ASSETS_SUCCESS, payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log("error",error)
      dispatch({ type: types.GET_USER_ASSETS_FAILURE, payload: error.message });
    }
  };

  export const getAssetsByIdAndUser = ({jwt,coinId}) => async (dispatch) => {
    dispatch({ type:types.GET_ASSET_DETAILS_REQUEST });
    try {
      const response = await api.get(`/api/assets/coin/${coinId}/user`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.GET_ASSET_DETAILS_SUCCESS, payload: response.data });
      console.log("hello"+response.data);
    } catch (error) {
      console.log("error",error)
      dispatch({ type: types.GET_ASSET_DETAILS_FAILURE, payload: error.message });
    }
  };
