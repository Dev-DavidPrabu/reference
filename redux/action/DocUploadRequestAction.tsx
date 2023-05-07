import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const ADD_DOC_UPLOAD_REQUEST = "ADD_DOC_UPLOAD_REQUEST";
export const GET_DOC_UPLOAD_REQUEST_DATA = "GET_DOC_UPLOAD_REQUEST_DATA";
export const RESET_CREATED_DATA_DOC = "RESET_CREATED_DATA_DOC";
export const DOC_UPLOAD_RESQUEST_APPROVE = "DOC_UPLOAD_RESQUEST_APPROVE";
export const GET_VIEW_DOCUPLOAD_REQ = "GET_VIEW_DOCUPLOAD_REQ";
export const GET_IDTYPE_RESPONSE = "GET_IDTYPE_RESPONSE";

export const addDocUploadReq = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addDocUploadReq;
    try {
      const addDocUploadReques = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (addDocUploadReques) {
        dispatch({ type: ADD_DOC_UPLOAD_REQUEST, data: addDocUploadReques });
      }
    } catch (error) {
    }
  };
};

export const getDocUploadRequest = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getDocUploadRequestData;
    try {
      const getDocUploadReqRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getDocUploadReqRes) {
        dispatch({
          type: GET_DOC_UPLOAD_REQUEST_DATA,
          data: getDocUploadReqRes,
        });
      }
    } catch (error) { }
  };
};

export const resetCreatedDataDoc = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_DATA_DOC });
  };
};

export const docUploadreqApproveCard = (history: any, id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.docUploadreqApproveData;
    try {
      const docUploadApproveRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (docUploadApproveRes) {
        dispatch({
          type: DOC_UPLOAD_RESQUEST_APPROVE,
          data: docUploadApproveRes,
        });

        if (docUploadApproveRes.data[0].requestStatus === "REJECTED") {
          history.push({
            pathname: "/dashboard/SRF/Doc-Upload-Request",
            state: "DocUploadRequest Rejected Successfully",
          });
        } else {
          history.push({
            pathname: "dashboard/SRF/Doc-Upload-Request",
            state: "DocUploadRequest Approved Successfully",
          });
        }
      }
    } catch (error: any) {
      if (error.response) {
        dispatch({
          type: DOC_UPLOAD_RESQUEST_APPROVE,
          data: error.response.data,
        });
      }
    }
  };
};

export const docUploadreqApprove = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.docUploadreqApproveData;
    try {
      const docUploadApproveRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (docUploadApproveRes) {
        dispatch({
          type: DOC_UPLOAD_RESQUEST_APPROVE,
          data: docUploadApproveRes,
        });
      }
    } catch (error: any) {
      if (error.response) {
        dispatch({
          type: DOC_UPLOAD_RESQUEST_APPROVE,
          data: error.response.data,
        });
      }
    }
  };
};

export const getViewDetails = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getDocuploadReqDetails +
      `?kycUpdateId=${id}`;
    try {
      const getViewScreenRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getViewScreenRes) {
        dispatch({ type: GET_VIEW_DOCUPLOAD_REQ, data: getViewScreenRes });
      }
    } catch (error) { }
  };
};

export const getIdtype = (id: any) => {
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
        dispatch({ type: GET_IDTYPE_RESPONSE, data: getIdtypeRes });
      }
    } catch (error) { }
  };
};
