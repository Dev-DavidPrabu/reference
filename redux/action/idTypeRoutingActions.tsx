import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_COUNTRY_REFERENCE_DATA = "GET_COUNTRY_REFERENCE_DATA";
export const GET_IDTYPE_REFERENCE_DATA = "GET_IDTYPE_REFERENCE_DATA";
export const GET_IDTYPE_DATA = "GET_IDTYPE_DATA";
export const CREATE_IDTYPE_ERROR = "CREATE_IDTYPE_ERROR";
export const RESET_CREATE_ERROR = "RESET_CREATE_ERROR";

export const getCountryReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_COUNTRY_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};
export const getIdtypeReferenceData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getIdDocRecordsDetail;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDTYPE_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getIdTypeRouting = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.idTypeList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDTYPE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_ERROR });
  };
};

export const createIdType = (createId: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.idTypeSave;
      const response = await axios.post(apiURL, createId).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_IDTYPE_ERROR, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};
export const deleteIdTypeRouting = (idTypeId: string) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.idTypeDelete + idTypeId;
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
