import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_TOGGLE_SUMMARY = "GET_TOGGLE_SUMMARY";
export const UPDATE_TOGGLE_SUMMARY = "UPDATE_TOGGLE_SUMMARY";
export const RESET_UPDATE_TOGGLE_SUMMARY = "RESET_UPDATE_TOGGLE_SUMMARY";
export const GET_ALL_TOGGLE_SUMMARY = "GET_ALL_TOGGLE_SUMMARY";
export const RESET_GET_TOGGLE_SUMMARY = "RESET_GET_TOGGLE_SUMMARY";
export const RESET_ALL_TOGGLE_SUMMARY = "RESET_ALL_TOGGLE_SUMMARY";

export const getToggleSummaryList = (moduleCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.toggleList + moduleCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_TOGGLE_SUMMARY, data: response.data });
      }
    } catch (error) {}
  };
};

export const getAllToggleSummaryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.toggleList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_TOGGLE_SUMMARY, data: response.data });
        dispatch({ type: RESET_GET_TOGGLE_SUMMARY });
      }
    } catch (error) {}
  };
};

export const resetALLToggleSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ALL_TOGGLE_SUMMARY });
  };
};

export const updateToggleSummary = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.toggleUpdate;
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: UPDATE_TOGGLE_SUMMARY, data: response.data });
  };
};
export const resetUpdateToggleSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_TOGGLE_SUMMARY });
  };
};
