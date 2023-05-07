import axios from "axios";
import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { walletTypeObjects } from "../../models/WalletSetupModel";
export const GET_ALL_WALLET_DATA = "GET_ALL_WALLET_DATA";
export const GET_ALL_WALLET_TYPE = "GET_ALL_WALLET_TYPE";
export const POST_NEW_WALLET_DATA = "POST_NEW_WALLET_DATA";
export const DELETE_WALLET_DATA = "DELETE_WALLET_DATA";
export const DELETE_WALLET_TYPE = "DELETE_WALLET_TYPE";
export const UPDATE_WALLET_DATA = "UPDATE_WALLET_DATA";

export const getAllWalletData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.walletList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_WALLET_DATA, data: response.data });
      }
    } catch (error) {}
  };
};
export const getAllWalletType = (type: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.carouselList + type;
    const response = await fetch(apiURL, {
      method: "GET",
    });
    const data = await response.json();

    dispatch({ type: GET_ALL_WALLET_TYPE, data: data.data });
  };
};

export const deleteWalletData = (walletTypeId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.walletDelete + walletTypeId;
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch({ type: DELETE_WALLET_DATA, data: data });
  };
};

export const deleteWalletListType = (id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.carouselDelete + id;

    const response = await fetch(apiURL, {
      method: "POST",
    });
    const data = await response.json();

    dispatch({ type: DELETE_WALLET_TYPE, data: data });
  };
};

export const updateWalletData = (apiBody: walletTypeObjects) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.walletSave;
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch({ type: UPDATE_WALLET_DATA, data: data });
  };
};

export const postNewWalletData = (apiBody: walletTypeObjects) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.walletSave;
    const response = await axios.post(apiURL, apiBody).then((responsevalue) => {
      return responsevalue.data;
    });
    const responseData = response;
    dispatch({ type: POST_NEW_WALLET_DATA, data: responseData });
  };
};
