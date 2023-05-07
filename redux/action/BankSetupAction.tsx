import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_BANK_SETUP_RECORDS_DATA = "GET_BANK_SETUP_REGORDS_DATA";
export const UPDATE_BANK_SETUP_RECORDS_DATA = "UPDATE_BANK_SETUP_REGORDS_DATA";
export const RESET_UPDATE_BANK_SETUP = "RESET_UPDATE_BANK_SETUP";
export const GET_VIEW_BANK_SETUP_RECORDS_DATA =
  "GET_VIEW_BANK_SETUP_RECORDS_DATA";
export const RESET_GET_BANK_SETUP = "RESET_GET_BANK_SETUP";

export const getBankSetupRecords = (countryCode: any, statusCode: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getBankSetupRecord +
      `/${countryCode}?showInactive=${statusCode}`;

    try {
      const bankSetupResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (bankSetupResponse) {
        dispatch({
          type: GET_BANK_SETUP_RECORDS_DATA,
          data: bankSetupResponse,
        });
      }
    } catch (error) {}
  };
};

export const updateBankSetupRecordsNew = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateBankSetupRecord;

    try {
      const updateBankSetupResponse = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateBankSetupResponse) {
        dispatch({
          type: UPDATE_BANK_SETUP_RECORDS_DATA,
          data: updateBankSetupResponse,
        });
      }
    } catch (error) {}
  };
};

export const getViewBankSetupRecords = (countryCode: any, bankCode: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.viewBankSetupRecord +
      `?countryCode=${countryCode}&bankCode=${bankCode}`;

    try {
      const viewBankSetupResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (viewBankSetupResponse) {
        dispatch({
          type: GET_VIEW_BANK_SETUP_RECORDS_DATA,
          data: viewBankSetupResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdateBankRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_BANK_SETUP });
  };
};

export const resetBankRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_BANK_SETUP });
  };
};
