import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_UPGRADE_CARD_RECORDS_DATA = "GET_UPGRADE_CARD_RECORDS_DATA";
export const APPROVE_UPGRADE_STATUS_RESPONSE =
  "APPROVE_UPGRADE_STATUS_RESPONSE";
export const ADD_UPGRADE_CARD_DETAILS = "ADD_UPGRADE_CARD_DETAILS";
export const CUSTOMER_CARD_UPGRADE_DETAILS = "CUSTOMER_CARD_UPGRADE_DETAILS";
export const RESET_GET_CUSTOMER_DETAILS = "RESET_GET_CUSTOMER_DETAILS";
export const GET_MOBILENO_DETAILS = "GET_MOBILENO_DETAILS";
export const RESET_GET_MOBILENO_DETAILS = "RESET_GET_MOBILENO_DETAILS";
export const GET_IDDOC_RECORDS_DATA = "GET_IDDOC_RECORDS_DATA";
export const GET_UPGRADE_TOGGLE_RESPONSE_RECORDS_DATA =
  "GET_UPGRADE_TOGGLE_RESPONSE_RECORDS_DATA";
export const REJECT_UPGRADE_STATUS_RESPONSE = "REJECT_UPGRADE_STATUS_RESPONSE";
export const GET_VERIFY_DETAILS = "GET_VERIFY_DETAILS";
export const RESET_VERIFY_DETAILS = "RESET_VERIFY_DETAILS";

export const getUpgradeCardRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getUpgradeCardRecords;
    try {
      const upgradeCardResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (upgradeCardResponse) {
        dispatch({
          type: GET_UPGRADE_CARD_RECORDS_DATA,
          data: upgradeCardResponse,
        });
      }
    } catch (error) {}
  };
};

export const addUpgradeCardRequest = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addUpgradeCardReq;
    try {
      const addUpgradeCardResponse = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addUpgradeCardResponse) {
        dispatch({
          type: ADD_UPGRADE_CARD_DETAILS,
          data: addUpgradeCardResponse,
        });
      }
    } catch (error) {}
  };
};

export const approveUpgradeStatus = (body: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approveUpgrade;
    try {
      const approveUpgradeStatusRes = await axios
        .post(apiURL, body)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveUpgradeStatusRes) {
        dispatch({
          type: APPROVE_UPGRADE_STATUS_RESPONSE,
          data: approveUpgradeStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const rejectUpgradeStatus = (body: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approveUpgrade;
    try {
      const rejectUpgradeStatusRes = await axios
        .post(apiURL, body)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (rejectUpgradeStatusRes) {
        dispatch({
          type: REJECT_UPGRADE_STATUS_RESPONSE,
          data: rejectUpgradeStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const getCustomerdetailMobile = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.cardUpgradeWallet;
    try {
      const getCustomerDetailsWithMobile = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getCustomerDetailsWithMobile) {
        dispatch({
          type: CUSTOMER_CARD_UPGRADE_DETAILS,
          data: getCustomerDetailsWithMobile,
        });
      }
    } catch (error) {}
  };
};

export const getMobileNumberUpgrade = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getCustomerDetailsUpgrade;
    try {
      const getMoileNumberRes = await axios
        .post(apiURL, mobileNumber)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getMoileNumberRes) {
        dispatch({ type: GET_MOBILENO_DETAILS, data: getMoileNumberRes });
      }
    } catch (error) {}
  };
};

export const resetGetMobileNumberUpgrade = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_MOBILENO_DETAILS });
  };
};

export const getIdDocRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getIdDocRecordsDetail;
    try {
      const idDocResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (idDocResponse) {
        dispatch({ type: GET_IDDOC_RECORDS_DATA, data: idDocResponse });
      }
    } catch (error) {}
  };
};

export const getUpgradeToggleIDList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getSRFtoggleID + "/SRF";
    try {
      const toggleResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (toggleResponse) {
        dispatch({
          type: GET_UPGRADE_TOGGLE_RESPONSE_RECORDS_DATA,
          data: toggleResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetCardUpgradeCustomerDetail = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_CUSTOMER_DETAILS });
  };
};

export const getVerifyDetail = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileVerify;
    try {
      const getVerifyMoileNumberRes = await axios
        .post(apiURL, mobileNumber)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getVerifyMoileNumberRes) {
        dispatch({ type: GET_VERIFY_DETAILS, data: getVerifyMoileNumberRes });
      }
    } catch (error) {}
  };
};

export const resetVerifyDetail = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_VERIFY_DETAILS });
  };
};
