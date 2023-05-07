import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_WALLET_FEATURE_SUMMARY = "GET_WALLET_FEATURE_SUMMARY";
export const RESET_WALLET_FEATURE_SUMMARY = "RESET_WALLET_FEATURE_SUMMARY";
export const ADD_WALLET_SUMMARY = "ADD_WALLET_SUMMARY";
export const RESET_ADD_WALLET_SUMMARY = "RESET_ADD_WALLET_SUMMARY";
export const WALLET_FEATURE_DATA_DELETE = "WALLET_FEATURE_DATA_DELETE";
export const RESET_DELETE_WALLET_FEATURE_DATA = "RESET_DELETE_WALLET_FEATURE_DATA";

export const getWalletFeatureSummary = () => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.WalletFeatureSummary;

    try {
      const getWalletFeatureSummary = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getWalletFeatureSummary) {
        dispatch({
          type: GET_WALLET_FEATURE_SUMMARY,
          data: getWalletFeatureSummary?.data,
        });
      }
    } catch (error) {}
  };
};

export const resetWalletSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_WALLET_FEATURE_SUMMARY });
  };
};

export const addNewWalletFeatureSummary = (value: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.AddWaletSummary;
    try {
      const addWalletFeatureSummary = await axios
        .post(apiURL, value)
        .then((response) => {
          if (response) {
            return response?.data;
          } else {
            return false;
          }
        });
      if (addWalletFeatureSummary) {
        dispatch({
          type: ADD_WALLET_SUMMARY,
          data: addWalletFeatureSummary,
        });
      }
    } catch (error) {}
  };
};

export const deleteWalletFeatureData = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.WalletFeatureDelete + id;
    const response = await axios.post(apiURL).then((response) => {
      return response.data;
    });
    dispatch({ type: WALLET_FEATURE_DATA_DELETE, data: response });
  };
};
export const resetNewWalletSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ADD_WALLET_SUMMARY });
  };
};

export const resetDeletedWalletFeatureData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_WALLET_FEATURE_DATA });
  };
};
