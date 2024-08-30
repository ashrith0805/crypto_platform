import * as types from './ActionTypes';
import api, { API_BASE_URL } from "@/config/api";
export const payOrder = ({jwt,request}) => async (dispatch) => {
    dispatch({ type:types.PAY_ORDER_REQUEST });
    try {
      const response = await api.post(`/api/orders/pay`,request,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.PAY_ORDER_SUCCESS, payload: response.data });
      console.log(response.data)
    } catch (error) {
      console.log("error",error)
      dispatch({ type: types.PAY_ORDER_FAILURE, payload: error.message });
    }
  };


  export const getOrder = ({jwt,orderId}) => async (dispatch) => {
    dispatch({ type:types.GET_ORDER_REQUEST });
    try {
      const response = await api.get(`/api/orders/${orderId}`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error)
      dispatch({ type: types.GET_ORDER_FAILURE, payload: error.message });
    }
  };



  export const getOrdersForUser = ({jwt,orderType,assetsymbol}) => async (dispatch) => {
    dispatch({ type:types.GET_ALL_ORDERS_REQUEST });
    try {
      const response = await api.get(`/api/orders`,{
        params: {
            order_type: orderType,
            asset_symbol:assetsymbol
          },
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: types.GET_ALL_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error)
      dispatch({ type: types.GET_ALL_ORDERS_FAILURE, payload: error.message });
    }
  };


