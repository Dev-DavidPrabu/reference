import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_RISK_FACTOR_LIST = "GET_RISK_FACTOR_LIST";
export const EDIT_RISK_FACTOR = "EDIT_RISK_FACTOR";
export const RESET_EDIT_RISK_FACTOR = "RESET_EDIT_RISK_FACTOR";

export const getRiskFactorList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRiskFactor;
    try {
      const response = await axios
        .get(apiURL, { params: { status: "" } })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_RISK_FACTOR_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_RISK_FACTOR });
  };
};

export const updateRiskFactor = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateRiskFactor;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_RISK_FACTOR, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};
