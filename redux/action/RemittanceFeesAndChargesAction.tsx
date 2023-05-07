import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_CHARGE_CODE_LIST = "GET_CHARGE_CODE_LIST";
export const GET_CHARGE_CODE_DETAIL = "GET_CHARGE_CODE_DETAIL";
export const CREATE_CHARGE_CODE = "CREATE_CHARGE_CODE";
export const RESET_CHARGE_CODE_ERROR = "RESET_CHARGE_CODE_ERROR";

export const getChargeList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getChargeCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CHARGE_CODE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getChargeDetails = (chargeCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getChargeDetails + chargeCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CHARGE_CODE_DETAIL, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateChargeCode = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CHARGE_CODE_ERROR });
  };
};

export const createChargeCode = (createId: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createChargeCode;
      const response = await axios.post(apiURL, createId).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_CHARGE_CODE, data: response });
        if (response.data) {
        }
      }
    } catch (error) {}
  };
};
