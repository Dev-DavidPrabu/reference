import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_IDTYPE_DATA_RES = "GET_IDTYPE_DATA_RES";
export const POST_IDTYPE_SUMMARY = "POST_IDTYPE_SUMMARY";
export const GET_IDTYPE_CODE_RES = "GET_IDTYPE_CODE_RES";
export const RESET_FILTER_DATA = "RESET_FILTER_DATA";
export const RESET_CREATED_DATA = "RESET_CREATED_DATA";
export const UPDATE_IDTYPE_SUMMARY = "UPDATE_IDTYPE_SUMMARY";
export const RESET_UPDATED_DATA = "RESET_UPDATED_DATA";
export const DELETE_IDTYPE_SUMMARY_DATA = "DELETE_IDTYPE_SUMMARY_DATA";
export const RESET_DELETE_IDTYPE_DATA = "RESET_DELETE_IDTYPE_DATA";

export const getIdtypeData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getIdtypeSummary;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDTYPE_DATA_RES, data: response.data });
      }
    } catch (error) {}
  };
};

export const getIdtypeCodeData = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getIdtypeCode + id;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDTYPE_CODE_RES, data: response.data });
      }
    } catch (error) {}
  };
};
export const resetFilterData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_DATA });
  };
};

export const resetCreatedData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FILTER_DATA });
  };
};

export const postIdtypeSummary = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addIdtypeSummary;
    try {
      const response = await axios.post(apiURL, apiBody).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: POST_IDTYPE_SUMMARY, data: response });
      }
    } catch (error) {}
  };
};

export const updateIdtypeSummary = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addIdtypeSummary;
    try {
      const response = await axios.post(apiURL, apiBody).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_IDTYPE_SUMMARY, data: response });
      }
    } catch (error) {}
  };
};
export const resetUpdatedData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATED_DATA });
  };
};

export const deleteIdtypeSummaryData = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.deleteIdTypeSummary + id;
    const response = await axios.post(apiURL).then((response) => {
      return response.data;
    });
    dispatch({ type: DELETE_IDTYPE_SUMMARY_DATA, data: response });
  };
};
export const resetDeletedIdtypeData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_IDTYPE_DATA });
  };
};
