import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_RISK_RATING_LIST = "GET_RISK_RATING_LIST";
export const CREATE_RISK_RATING = "CREATE_RISK_RATING";
export const RESET_CREATE_RISK_RATING = "RESET_CREATE_RISK_RATING";
export const EDIT_RISK_RATING = "EDIT_RISK_RATING";
export const RESET_EDIT_RISK_RATING = "RESET_EDIT_RISK_RATING";

export const getRiskRatingList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRiskRating;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_RISK_RATING_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_RISK_RATING });
  };
};

export const createRiskRatingData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createRiskRating;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_RISK_RATING, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_RISK_RATING });
  };
};

export const updateRiskRating = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateRiskRating;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_RISK_RATING, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteRiskRating = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deleteRiskRating + id;
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
