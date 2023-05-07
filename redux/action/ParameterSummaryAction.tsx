import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PARAMETER_SUMMARY = "GET_PARAMETER_SUMMARY";
export const GET_PARAMETER_MODULE = "GET_PARAMETER_MODULE";
export const UPDATE_PARAMETER_SUMMARY = "UPDATE_PARAMETER_SUMMARY";
export const CLEAR_UPDATE_SUMMARY = "CLEAR_UPDATE_SUMMARY";

export const getParameterData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.parameterList;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_PARAMETER_SUMMARY, data: getResponse });
      }
    } catch (error) {}
  };
};

export const getParameterModuleData = (module: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.parameterListByModule + `/${module}`;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_PARAMETER_MODULE, data: getResponse });
      }
    } catch (error) {}
  };
};

export const updateParameterData = (newParameter: any, id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.parameterUpdate + `/${id}`;
    try {
      const getResponse = await axios.post(apiURL,newParameter).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: UPDATE_PARAMETER_SUMMARY, data: getResponse });
      }
    } catch (error) {}
  };
};

export const clearUpdateData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_UPDATE_SUMMARY });
  };
};
