import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAY_GROUP_DATA = "GET_PAY_GROUP_DATA";
export const UPDATE_PAYING_GROUP_RECORDS_DATA =
  "UPDATE_PAYING_GROUP_RECORDS_DATA";
export const RESET_UPDATE_PAY_GROUP = "RESET_UPDATE_PAY_GROUP";
export const RESET_PAYING_GROUP_DATA = "RESET_PAYING_GROUP_DATA";

export const getPayGroupRecords = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getPayGroupList;
    try {
      const payGroupRecordsResponse = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (payGroupRecordsResponse) {
        dispatch({ type: GET_PAY_GROUP_DATA, data: payGroupRecordsResponse });
      }
    } catch (error) {}
  };
};

export const updatePayingGroupSetupRecordsNew = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updatePayingGroupRecords;

    try {
      const updatePayingGroupResponse = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updatePayingGroupResponse) {
        dispatch({
          type: UPDATE_PAYING_GROUP_RECORDS_DATA,
          data: updatePayingGroupResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdatePayGroupRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_PAY_GROUP });
  };
};
export const resetGetPayingGroupData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYING_GROUP_DATA });
  };
};
