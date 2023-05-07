import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_WALLET_SIZE_SETUP_DATA = "GET_WALLET_SIZE_SETUP_DATA";
export const UPDATE_WALLET_SIZE_SETUP_DATA = "UPDATE_WALLET_SIZE_SETUP_DATA";
export const RESET_UPDATE_WALLET_SIZE_SETUP_DATA =
  "RESET_UPDATE_WALLET_SIZE_SETUP_DATA";
export const GET_WALLET_FEATURE_CODE_DATA = "GET_WALLET_FEATURE_CODE_DATA";

export const getWalletSizeSetupData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getWalletSizeSetupList;
    try {
      const getWalletSizeSetupListRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getWalletSizeSetupListRes) {
        dispatch({
          type: GET_WALLET_SIZE_SETUP_DATA,
          data: getWalletSizeSetupListRes,
        });
      }
    } catch (error) {}
  };
};

export const updateWalletSizeSetupData = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateWalletSizeSetupList;
    try {
      const updateWalletSizeSetupRes = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateWalletSizeSetupRes) {
        dispatch({
          type: UPDATE_WALLET_SIZE_SETUP_DATA,
          data: updateWalletSizeSetupRes,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdatedWallet = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_WALLET_SIZE_SETUP_DATA });
  };
};

export const getWalletFeatureCode = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getWalletFeatureCode;
    try {
      const getWalletFeatureCodeRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getWalletFeatureCodeRes) {
        dispatch({
          type: GET_WALLET_FEATURE_CODE_DATA,
          data: getWalletFeatureCodeRes,
        });
      }
    } catch (error) {}
  };
};
