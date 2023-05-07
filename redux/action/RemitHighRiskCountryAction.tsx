import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_HIGH_RISK_COUNTRY_LIST = "GET_HIGH_RISK_COUNTRY_LIST";
export const EDIT_HIGH_RISK_COUNTRY = "EDIT_HIGH_RISK_COUNTRY";
export const RESET_EDIT_HIGH_RISK_COUNTRY = "RESET_EDIT_HIGH_RISK_COUNTRY";

export const getHighRiskCountryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getHighRiskCountry;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_HIGH_RISK_COUNTRY_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_HIGH_RISK_COUNTRY });
  };
};

export const updateHighRiskCountry = (id: string, status: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateHighRiskCountry;
      const response = await axios
        .post(apiURL, {
          id: id,
          status: status,
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: EDIT_HIGH_RISK_COUNTRY, data: response });
      }
    } catch (error) {}
  };
};
