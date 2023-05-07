import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_UNBLOCK_CARD_RECORDS_DATA = "GET_UNBLOCK_CARD_RECORDS_DATA";
export const APPROVE_UNBLOCK_STATUS_RESPONSE =
  "APPROVE_UnBLOCK_STATUS_RESPONSE";
export const REJECT_UNBLOCK_CARD_STATUS_RESPONSE =
  "REJECT_UNBLOCK_CARD_STATUS_RESPONSE";
export const ADD_UNBLOCK_CARD_DETAILS = "ADD_UNBLOCK_CARD_DETAILS";
export const ADD_UNBLOCK_MOBILENO_DETAILS = "ADD_UNBLOCK_MOBILENO_DETAILS";
export const USER_ACCESS_LEVEL_UNBLOCK = "USER_ACCESS_LEVEL_UNBLOCK";
export const RESET_APPROVE_DATA = "RESET_APPROVE_DATA";
export const VERIFY_UNBLOCK_MOBILENO_DETAILS =
  "VERIFY_UNBLOCK_MOBILENO_DETAILS";
export const RESET_ADD_DATA = "RESET_ADD_DATA";
export const RESET_VERIFY_DATA = "RESET_VERIFY_DATA";
export const GET_IDTYPE_CARD_UNBLOCK_RESPONSE =
  "GET_IDTYPE_CARD_UNBLOCK_RESPONSE";
export const PROOF_DOC_SELFIE_UPLOAD = "PROOF_DOC_SELFIE_UPLOAD";
export const RESPONSE_MESSAGE = "RESPONSE_MESSAGE";
export const RESET_RESPONSE_MSG ="RESET_RESPONSE_MSG"


export const getUnBlockCardRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getUnBlockCardRecords;
    try {
      const unBlockCardResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (unBlockCardResponse) {
        dispatch({
          type: GET_UNBLOCK_CARD_RECORDS_DATA,
          data: unBlockCardResponse,
        });
      }
    } catch (error) {}
  };
};

export const getUserAccess = (functionCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getUserDetails + functionCode;

    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: USER_ACCESS_LEVEL_UNBLOCK, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const addUnBlockCardRequest = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addUnBlockCardReq;
    try {
      const addUnBlockCardResponse = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addUnBlockCardResponse) {
        dispatch({
          type: ADD_UNBLOCK_CARD_DETAILS,
          data: addUnBlockCardResponse,
        });
      }
    } catch (error) {}
  };
};

export const getMobileNumberUnblock = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getCustomerDetails;
    try {
      const addUnBlockCardMobileNoResponse = await axios
        .post(apiURL, mobileNumber)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addUnBlockCardMobileNoResponse) {
        dispatch({
          type: ADD_UNBLOCK_MOBILENO_DETAILS,
          data: addUnBlockCardMobileNoResponse,
        });
      }
    } catch (error) {}
  };
};
export const getMobileNumberVerify = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getUnblockMobileNoVerify;
    try {
      const verifyUnBlockCardMobileNoResponse = await axios
        .post(apiURL, mobileNumber)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (verifyUnBlockCardMobileNoResponse) {
        dispatch({
          type: VERIFY_UNBLOCK_MOBILENO_DETAILS,
          data: verifyUnBlockCardMobileNoResponse,
        });
      }
    } catch (error) {}
  };
};
export const approveUnBlockStatus = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approveUnBlockStatus;
    try {
      const approveUnBlockStatusRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveUnBlockStatusRes) {
        dispatch({
          type: APPROVE_UNBLOCK_STATUS_RESPONSE,
          data: approveUnBlockStatusRes,
        });
      }
    } catch (error) {}
  };
};
export const resetApproveData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_APPROVE_DATA });
  };
};

export const resetAddDatas = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ADD_DATA });
  };
};

export const resetVerifyRes = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_VERIFY_DATA });
  };
};

export const rejectUnBlockRequest = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.rejectUnBlockRequest;
    try {
      const rejectUnBlockStatusRes = await axios
        .post(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (rejectUnBlockStatusRes) {
        dispatch({
          type: REJECT_UNBLOCK_CARD_STATUS_RESPONSE,
          data: rejectUnBlockStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const getIdtypeByCountry = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getIdtypeCodeList + id;
    try {
      const getIdtypeRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getIdtypeRes) {
        dispatch({
          type: GET_IDTYPE_CARD_UNBLOCK_RESPONSE,
          data: getIdtypeRes,
        });
      }
    } catch (error) {}
  };
};

export const uploadSelfieFile = (fileData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.docUpload;

    const docSelfieUploadeResponse = await axios
      .post(apiURL, fileData)
      .then((response) => {
        return response?.data;
      });
    if (docSelfieUploadeResponse)
      dispatch({
        type: PROOF_DOC_SELFIE_UPLOAD,
        data: docSelfieUploadeResponse || [],
      });
  };
};

export const UnblockResponseMessage = (data:any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.UnblockResponseMessage;
    try {
      const UnblockResponseMessageRes = await axios.post(apiURL,data).then((response) => { 
        if (response) {
          return response?.data; 
        } else {
          return false;
        }
      });
      if (UnblockResponseMessageRes) {
        dispatch({
          type: RESPONSE_MESSAGE,
          data: UnblockResponseMessageRes,
        });
      }
    } catch (error) {}
  };
};

export const resetResponseMsg=()=>{
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_RESPONSE_MSG });
  };
}