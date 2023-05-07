import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_USER_COMPANY = "GET_USER_COMPANY";

export const getViewCompanyUser = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getViewCompanyUserList +
      `companyId=${id}`;
    try {
      const getViewCompanyResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getViewCompanyResponse) {
        dispatch({ type: GET_USER_COMPANY, data: getViewCompanyResponse });
      }
    } catch (error) {}
  };
};
