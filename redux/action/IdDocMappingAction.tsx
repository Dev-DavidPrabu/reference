import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_ID_DOC_MAPPING_LIST = "GET_ID_DOC_MAPPING_LIST";
export const CREATE_ID_DOC_MAPPING = "CREATE_ID_DOC_MAPPING";
export const RESET_CREATE_ID_DOC_MAPPING = "RESET_CREATE_ID_DOC_MAPPING";
export const EDIT_ID_DOC_MAPPING = "EDIT_ID_DOC_MAPPING";
export const RESET_EDIT_ID_DOC_MAPPING = "RESET_EDIT_ID_DOC_MAPPING";

export const getIdDocMappingList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.idDocMappingList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ID_DOC_MAPPING_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_ID_DOC_MAPPING });
  };
};

export const createIddocMappingData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.idDocMappingCreate;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_ID_DOC_MAPPING, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_ID_DOC_MAPPING });
  };
};

export const updateIdDocMappingData = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.idDocMappingUpdate;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_ID_DOC_MAPPING, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};
