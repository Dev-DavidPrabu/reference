import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_CARD_TYPE_LIST = "GET_CARD_TYPE_LIST";

export const getAllCardType = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getCardType;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CARD_TYPE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};
