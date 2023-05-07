import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_EXCHANGE_RATE_LIST = "GET_EXCHANGE_RATE_LIST";
export const RESET_EXCHANGE_RATE_LIST = "RESET_EXCHANGE_RATE_LIST";
export const CREATE_RISK_RATING = "CREATE_RISK_RATING";
export const RESET_CREATE_RISK_RATING = "RESET_CREATE_RISK_RATING";
export const UPDATE_EXCHANGE_RATE = "UPDATE_EXCHANGE_RATE";
export const RESET_UPDATE_EXCHANGE_RATE = "RESET_UPDATE_EXCHANGE_RATE";

export const getExchangeRateList = (exchangeRateRequest: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getExchangeRate;
    try {
      const response = await axios
        .get(apiURL, { params: exchangeRateRequest })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_EXCHANGE_RATE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetExchangeRateList = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EXCHANGE_RATE_LIST });
  };
};

export const resetExchangeRateEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_EXCHANGE_RATE });
  };
};

export const updateExchangeRate = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateExchangeRate;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_EXCHANGE_RATE, data: response });
      }
    } catch (error) {}
  };
};
