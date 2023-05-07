import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_CARD_SOURCE_CODE_LIST = "GET_CARD_SOURCE_CODE_LIST";

export const getAllCardSourceCode = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getcardSourceCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CARD_SOURCE_CODE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};
