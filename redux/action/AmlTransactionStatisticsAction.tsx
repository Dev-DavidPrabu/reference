import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_TRANSACTION_STATISTICS_LIST =
  "GET_TRANSACTION_STATISTICS_LIST";
export const CREATE_TRANSACTION_STATISTICS = "CREATE_TRANSACTION_STATISTICS";
export const RESET_CREATE_TRANSACTION_STATISTICS =
  "RESET_CREATE_TRANSACTION_STATISTICS";
export const EDIT_TRANSACTION_STATISTICS = "EDIT_TRANSACTION_STATISTICS";
export const RESET_EDIT_TRANSACTION_STATISTICS =
  "RESET_EDIT_TRANSACTION_STATISTICS";
export const GET_RISK_FACTOR_CATEGORY_LIST = "GET_RISK_FACTOR_CATEGORY_LIST";

export const getTransactionStatisticsList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getTransactionStatistics;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_TRANSACTION_STATISTICS_LIST,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const getRiskFactorCategoryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.riskFactorAndCategoryList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_RISK_FACTOR_CATEGORY_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_TRANSACTION_STATISTICS });
  };
};

export const createTransactionStatisticData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.createTransactionStatistics;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_TRANSACTION_STATISTICS, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_TRANSACTION_STATISTICS });
  };
};

export const updateTransactionStatistics = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.updateTransactionStatistics;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_TRANSACTION_STATISTICS, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteTransactionStatistics = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.deleteTransactionStatistics + id;
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
