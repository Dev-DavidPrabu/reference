import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAYOUT_COUNTRY_DATA = "GET_PAYOUT_COUNTRY_DATA";
export const UPDATE_PAYOUT_COUNTRY = "UPDATE_PAYOUT_COUNTRY";
export const RESET_UPDATE_PAYOUT_COUNTRY_DATA =
  "RESET_UPDATE_PAYOUT_COUNTRY_DATA";
export const ADD_PAYOUT_COUNTRY_DETAILS = "ADD_PAYOUT_COUNTRY_DETAILS";
export const RESET_CREATED_PAYOUT_COUNTRY_DATA =
  "RESET_CREATED_PAYOUT_COUNTRY_DATA";

export const getPayoutCountryRecords = (countryCode: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getPayoutCountryRecord +
      `${countryCode}` +
      "/list";
    try {
      const payGroupRecordsResponse = await axios
        .get(apiURL, countryCode)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (payGroupRecordsResponse) {
        dispatch({
          type: GET_PAYOUT_COUNTRY_DATA,
          data: payGroupRecordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const updatePayoutCountry = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updatePayoutCountry;
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: UPDATE_PAYOUT_COUNTRY, data: response });
  };
};

export const resetUpdatePayoutCountryData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_PAYOUT_COUNTRY_DATA });
  };
};
export const addPayoutCountryDetails = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addPayoutCountryRecords;
    try {
      const addDetailedResponse = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addDetailedResponse) {
        dispatch({
          type: ADD_PAYOUT_COUNTRY_DETAILS,
          data: addDetailedResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetCreatedPayoutCountryData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_PAYOUT_COUNTRY_DATA });
  };
};
export const resetGetPayoutCountryData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: GET_PAYOUT_COUNTRY_DATA });
  };
};
