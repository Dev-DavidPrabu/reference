import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const CREATE_USER_COMPANY = "CREATE_USER_COMPANY";
export const RESET_CREATE_USER_COMPANY = "RESET_CREATE_USER_COMPANY";

export const createCompanyUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.prefundCompanyUserSave;
    try {
      const createCompanyResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (createCompanyResponse) {
        dispatch({ type: CREATE_USER_COMPANY, data: createCompanyResponse });
      }
    } catch (error) {}
  };
};
export const clearCreateInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_USER_COMPANY });
  };
};
