import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_LIMIT_TRANSACTION_LIST = "GET_LIMIT_TRANSACTION_LIST";
export const UPDATE_LIMIT_TRANSACTION_LIST = "UPDATE_LIMIT_TRANSACTION_LIST";

export const getLimitTransactionList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getLimitTransactionData;
    try {
      const transactionLimitRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (transactionLimitRes) {
        dispatch({
          type: GET_LIMIT_TRANSACTION_LIST,
          data: transactionLimitRes,
        });
      }
    } catch (error) {}
  };
};

export const updateTransDetails = (updateDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateTransactionLimit;
    try {
      const updateResponse = await axios
        .post(apiURL, updateDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateResponse) {
        dispatch({ type: UPDATE_LIMIT_TRANSACTION_LIST, data: updateResponse });
      }
    } catch (error) {}
  };
};
