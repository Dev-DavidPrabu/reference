import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_RISK_SCALE_LIST = "GET_RISK_SCALE_LIST";
export const CREATE_RISK_SCALE = "CREATE_RISK_SCALE";
export const RESET_CREATE_RISK_SCALE = "RESET_CREATE_RISK_SCALE";
export const EDIT_RISK_SCALE = "EDIT_RISK_SCALE";
export const RESET_EDIT_RISK_SCALE = "RESET_EDIT_RISK_SCALE";

export const getRiskScale = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRiskScaleList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_RISK_SCALE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_RISK_SCALE });
  };
};

export const createRiskScaleData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createRiskScale;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_RISK_SCALE, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_RISK_SCALE });
  };
};

export const updateRiskScale = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateRiskScale;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_RISK_SCALE, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteRiskScale = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deleteRiskScale + id;
      const response = await axios.post(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        window.location.reload();
      }
    } catch (error) {}
  };
};
