import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_BLOCK_CARD_RECORDS_DATA = "GET_BLOCK_CARD_RECORDS_DATA";
export const APPROVE_BLOCK_STATUS_RESPONSE = "APPROVE_BLOCK_STATUS_RESPONSE";
export const CUSTOMER_UNBLOCK_CARD_DETAILS = "CUSTOMER_UNBLOCK_CARD_DETAILS";
export const REJECT_BLOCK_CARD_STATUS_RESPONSE =
  "REJECT_BLOCK_CARD_STATUS_RESPONSE";
export const UPDATE_BLOCK_CARD_REQUEST_DATA = "UPDATE_BLOCK_CARD_REQUEST_DATA";
export const ADD_BLOCK_CARD_DETAILS = "ADD_BLOCK_CARD_DETAILS";
export const CUSTOMER_BLOCK_CARD_DETAILS = "CUSTOMER_BLOCK_CARD_DETAILS";
export const RESET_GET_CUSTOMER_DETAIL = "RESET_GET_CUSTOMER_DETAIL";
export const GET_TOGGLE_RESPONSE_RECORDS_DATA =
  "GET_TOGGLE_RESPONSE_RECORDS_DATA";
export const RESET_GET_TOGGLE_DETAIL = "RESET_GET_TOGGLE_DETAIL";
export const VERIFY_BLOCK_MOBILENO_DETAILS = "VERIFY_BLOCK_MOBILENO_DETAILS";
export const RESPONSE_MESSAGE = "RESPONSE_MESSAGE";

export const getBlockCardRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBlockCardRecords;
    try {
      const blockCardResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (blockCardResponse) {
        dispatch({
          type: GET_BLOCK_CARD_RECORDS_DATA,
          data: blockCardResponse,
        });
      }
    } catch (error) {}
  };
};

export const getCustomerunblockdetailMob = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.postunblockCardRequest;
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
          type: CUSTOMER_UNBLOCK_CARD_DETAILS,
          data: getCustomerDetailsWithMobile,
        });
      }
    } catch (error) {}
  };
};

export const getCustomerdetailMob = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.postblockCardRequest;
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
          type: CUSTOMER_BLOCK_CARD_DETAILS,
          data: getCustomerDetailsWithMobile,
        });
      }
    } catch (error) {}
  };
};

export const addBlockCardRequest = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addBlockCardReq;
    try {
      const addBlockCardResponse = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addBlockCardResponse) {
        dispatch({ type: ADD_BLOCK_CARD_DETAILS, data: addBlockCardResponse });
      }
    } catch (error) {}
  };
};

export const updateBlockCardRequest = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateBlockCardRequest;
    try {
      const updateBlockCardRequestResponse = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateBlockCardRequestResponse) {
        dispatch({
          type: UPDATE_BLOCK_CARD_REQUEST_DATA,
          data: updateBlockCardRequestResponse,
        });
      }
    } catch (error) {}
  };
};

export const approveBlockStatus = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approveBlockStatus;
    try {
      const approveBlockStatusRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveBlockStatusRes) {
        dispatch({
          type: APPROVE_BLOCK_STATUS_RESPONSE,
          data: approveBlockStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const rejectBlockRequest = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.rejectBlockRequest;
    try {
      const rejectBlockStatusRes = await axios.post(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (rejectBlockStatusRes) {
        dispatch({
          type: REJECT_BLOCK_CARD_STATUS_RESPONSE,
          data: rejectBlockStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const resetCustomerDetail = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_CUSTOMER_DETAIL });
  };
};

export const getToggleIDList = () => {
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
          type: GET_TOGGLE_RESPONSE_RECORDS_DATA,
          data: toggleResponse,
        });
      }
    } catch (error) {}
  };
};
export const resetToggle = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_TOGGLE_DETAIL });
  };
};
export const getBlockMobileNumberVerify = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getblockMobileNoVerify;
    try {
      const verifyBlockCardMobileNoResponse = await axios
        .post(apiURL, mobileNumber)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (verifyBlockCardMobileNoResponse) {
        dispatch({
          type: VERIFY_BLOCK_MOBILENO_DETAILS,
          data: verifyBlockCardMobileNoResponse,
        });
      }
    } catch (error) {}
  };
};

export const ResponseMessage = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.ResponseMessage;
    try {
      const ResponseMessageRes = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response?.data;
          } else {
            return false;
          }
        });
      if (ResponseMessageRes) {
        dispatch({
          type: RESPONSE_MESSAGE,
          data: ResponseMessageRes,
        });
      }
    } catch (error: any) {
    }
  };
};
