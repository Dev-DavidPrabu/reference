import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_ALL_REFERENCE_DATA = "GET_ALL_REFERENCE_DATA";
export const POST_REFRENCE_DATA = "POST_REFRENCE_DATA";
export const DELETE_REFERENCE_DATA = "DELETE_REFERENCE_DATA";
export const RESET_CREATE_ERROR = "RESET_CREATE_ERROR";
export const RESET_REFERENCE_DATA = "RESET_REFERENCE_DATA";

export const getAllReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const deleteReferenceData = (referenceDataId: string) => {
  return async () => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.referenceDataDelete + referenceDataId;
      await axios.post(apiURL);
      window.location.reload();
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_ERROR });
  };
};

export const resetReferenceData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REFERENCE_DATA });
  };
};

export const createReferenceData = (createData: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.referenceDataCreate;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: POST_REFRENCE_DATA, data: response });
        if (response.data?.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};
