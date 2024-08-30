import axios from "axios";
import api, { API_BASE_URL } from "@/config/api";
import * as types from "./ActionTypes"
export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get("/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

export const getWalletTransactions =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

    try {
      const response = await api.get("/api/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: types.GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data,
      });
      console.log("wallet transaction", response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_WALLET_TRANSACTION_FAILURE,
        error: error.message,
      });
    }
  };


export const depositMoney =
  ({ jwt, orderId, navigate }) =>
  async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.put(`/api/wallet/deposit`, null, {
        params: {
          order_id: orderId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });
      navigate("/wallet")
      //console.log(response.data);
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

  export const paymentHandler =
  ({ jwt, amount }) =>
  async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.post(`/api/payment/amount/${amount}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      window.location.href=response.data.paymentUrl;
    //   dispatch({
    //     type: types.DEPOSIT_MONEY_SUCCESS,
    //     payload: response.data
    //   });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

  export const transferMoney =
  ({ jwt, walletId,reqData }) =>
  async (dispatch) => {
    dispatch({ type: types.TRANSFER_MONEY_REQUEST });

    try {
      const response = await api.put(`/api/wallet/${walletId}/transfer`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.TRANSFER_MONEY_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.TRANSFER_MONEY_FAILURE,
        error: error.message,
      });
    }
  };



