import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_ECDD_SETUP_LIST = "GET_ECDD_SETUP_LIST";
export const CREATE_ECDD_SETUP = "CREATE_ECDD_SETUP";
export const RESET_CREATE_ECDD_SETUP = "RESET_CREATE_ECDD_SETUP";

export const getEcddList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAmlEcddList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ECDD_SETUP_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_ECDD_SETUP });
  };
};

export const createEcddSetupData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createEcddSetup;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_ECDD_SETUP, data: response });
      }
    } catch (error) {}
  };
};
