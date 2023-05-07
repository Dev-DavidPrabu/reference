import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_BANK_SETUP_COUNTRY_RECORDS_DATA =
  "GET_BANK_SETUP_COUNTRY_RECORDS_DATA";

export const getBankSetupCountryRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBankSetupCountry;
    try {
      const banksetupCountryRecords = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (banksetupCountryRecords) {
        dispatch({
          type: GET_BANK_SETUP_COUNTRY_RECORDS_DATA,
          data: banksetupCountryRecords,
        });
      }
    } catch (error) {}
  };
};
