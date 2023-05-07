import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_RISK_FACTOR_STATUS_LIST = "GET_RISK_FACTOR_STATUS_LIST";
export const EDIT_RISK_FACTOR_STATUS = "EDIT_RISK_FACTOR_STATUS";
export const RESET_EDIT_RISK_FACTOR_STATUS = "RESET_EDIT_RISK_FACTOR_STATUS";

export const getRiskFactorStatusConfigList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRiskFactorStatusConfig;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_RISK_FACTOR_STATUS_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_RISK_FACTOR_STATUS });
  };
};

export const updateRiskFactorStatusConfig = (id: string, status: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateRiskFactorStatus;
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
        dispatch({ type: EDIT_RISK_FACTOR_STATUS, data: response });
      }
    } catch (error) {}
  };
};
