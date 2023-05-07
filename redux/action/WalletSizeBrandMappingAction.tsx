import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_WALLET_SIZE_BRAND_MAPPING_DATA =
  "GET_WALLET_SIZE_BRAND_MAPPING_DATA";
export const UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA =
  "UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA";
export const RESET_UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA =
  "RESET_UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA";

export const getWalletSizeBrandMappingData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getWalletSizeBrandMapping;
    try {
      const getWalletSizeBrandMappingListRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getWalletSizeBrandMappingListRes) {
        dispatch({
          type: GET_WALLET_SIZE_BRAND_MAPPING_DATA,
          data: getWalletSizeBrandMappingListRes,
        });
      }
    } catch (error) {}
  };
};

export const updateWalletSizeBrandMappingData = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.updateWalletSizeBrandMapping;
    try {
      const updateWalletSizeBrandMappingRes = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateWalletSizeBrandMappingRes) {
        dispatch({
          type: UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA,
          data: updateWalletSizeBrandMappingRes,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdatedWalletMapping = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA });
  };
};
