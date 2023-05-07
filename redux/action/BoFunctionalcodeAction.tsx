import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Fields } from "../../models/ReferenceDataModel";

export const GET_FUNCTIONALCODE_DATA = "GET_FUNCTIONALCODE_DATA";
export const FUNCTIONALCODE_DATA_ADD = "FUNCTIONALCODE_DATA_ADD";
export const FUNCTIONALCODE_DATA_EDIT = "FUNCTIONALCODE_DATA_EDIT";
export const RESET_EDIT_CREATE_SUCCESS = "RESET_EDIT_CREATE_SUCCESS";
export const RESET_CREATE_SUCCESS = "RESET_CREATE_SUCCESS";
export const CREATE_IDTYPE_ERROR = "CREATE_IDTYPE_ERROR";

export const getFunctionalCode = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.FunctionalCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_FUNCTIONALCODE_DATA, data: response.data });
      }
    } catch (error) { }
  };
};
export const createFunctionCode = (data: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.FunctionalCodeADD;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: FUNCTIONALCODE_DATA_ADD, data: response });
      }
    } catch (error) { }
  };
};
export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_SUCCESS });
  };
};
export const EditFunctionCode = (data: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.FunctionalCodeEdit;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: FUNCTIONALCODE_DATA_EDIT, data: response });
      }
    } catch (error) { }
  };
};
export const resetEditCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_CREATE_SUCCESS });
  };
};

export const deleteFunctionCode = (data: string) => {
  return async () => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.FunctionCodeDelete + `?id=${data}`;
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
    } catch (error) { }
  };
};
