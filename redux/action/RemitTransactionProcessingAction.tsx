import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TRANSFER_RECORDS_DATA_BY_ID =
  "GET_TRANSFER_RECORDS_DATA_BY_ID";
export const GET_TRANSFER_DATA = "GET_TRANSFER_DATA";
export const APPROVE_STATUS_RESPONSE = "APPROVE_STATUS_RESPONSE";
export const APPROVE_REMARK_RESPONSE = "APPROVE_REMARK_RESPONSE";
export const REJECT_REMARK_RESPONSE = "REJECT_REMARK_RESPONSE";

export const PROCESS_STATUS_RESPONSE = "PROCESS_STATUS_RESPONSE";
export const PROCESS_STATUS_REJECT = "PROCESS_STATUS_REJECT";
export const GET_PAYMENT_METHOD_LIST = "GET_PAYMENT_METHOD_LIST";
export const GET_FRONT_DOC_RES = "GET_FRONT_DOC_RES";
export const GET_BACK_DOC_RES = "GET_BACK_DOC_RES";
export const RESET_GET_TRANSFER_DATA = "RESET_GET_TRANSFER_DATA";

export const GET_STATUS_COUNT_DATA = "GET_STATUS_COUNT_DATA";
export const RESET_GET_STATUS_COUNT_DATA = "RESET_GET_STATUS_COUNT_DATA";
export const GET_STATUS_COUNT_TABLE_DATA = "GET_STATUS_COUNT_TABLE_DATA";
export const RESET_GET_STATUS_COUNT_TABLE_DATA =
  "RESET_GET_STATUS_COUNT_TABLE_DATA";
export const GET_COMPLAINCE_SENDER_INFO = " GET_COMPLAINCE_SENDER_INFO";
export const GET_COMPLAINCE_ON_BEHALF_SENDER_INFO =
  "GET_COMPLAINCE_ON_BEHALF_SENDER_INFO";
export const UPDATE_MATCHTYPE__RESPONSE = "UPDATE_MATCHTYPE__RESPONSE";
export const RESET_STORE_RESPONSE = "RESET_STORE_RESPONSE";
export const GET_AUDIT_CONFIRMMATCH_INFO = "GET_AUDIT_CONFIRMMATCH_INFO";
export const UPDATE_CUSTOMER_CW_FAILED_INFO = "UPDATE_CUSTOMER_CW_FAILED_INFO";
export const RESET_STATUS_RESPONSE="RESET_STATUS_RESPONSE";

export const getTransferRecordsByID = (txnId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getTransferByTransID + txnId;
    try {
      const transferRecordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (transferRecordsResponse) {
        dispatch({
          type: GET_TRANSFER_RECORDS_DATA_BY_ID,
          data: transferRecordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const getTransferListData = (dataValue: any) => {
  return async (dispatch: Dispatch) => {
    var value = {
      startDate: `${dataValue?.startDate}T00:00:00`,
      endDate: `${dataValue?.endDate}T23:59:59`,
    };
    const data = Object.keys(dataValue);
    data.forEach((add: any) => {
      if (
        dataValue[add].length > 0 &&
        add !== "startDate" &&
        add !== "endDate"
      ) {
        var pair = {};
        switch (add) {
          case "transactionStatusList":
            pair = { transactionStatusList: dataValue[add] };
            break;
          case "remitStatusList":
            pair = { remitStatusList: dataValue[add] };
            break;
          case "receiverCountryList":
            pair = { receiverCountryList: dataValue[add] };
            break;
          case "paymentMethodList":
            pair = { paymentMethodList: dataValue[add] };
            break;
          default:
            break;
        }
        value = { ...value, ...pair };
      }
    });
    const apiURL = Constants.BaseURL + ApiEndPoints.getTransferList;
    try {
      const transferListDataResponse = await axios
        .post(apiURL, value)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (transferListDataResponse) {
        dispatch({ type: GET_TRANSFER_DATA, data: transferListDataResponse });
      }
    } catch (error) {}
  };
};

export const resetTransferData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_TRANSFER_DATA });
  };
};

export const approveStatus = (transactionStatusId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approveStatusRemit;
    try {
      const approveStatusRes = await axios
        .post(apiURL, transactionStatusId)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveStatusRes) {
        dispatch({ type: APPROVE_STATUS_RESPONSE, data: approveStatusRes });
      }
    } catch (error) {}
  };
};
export const approveStatusRemark = (
  transactionStatusId: any,
  remark: any,
  status: any
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      `${
        status === "Approve"
          ? ApiEndPoints.approveStatusRemarkRemit
          : ApiEndPoints.approveStatusRemarkReject
      }`;
    let body = {
      transactionId: transactionStatusId,
      remarks: remark,
    };
    try {
      const approveStatusRes = await axios
        .post(apiURL, body)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveStatusRes) {
        if (status === "Approve") {
          dispatch({ type: APPROVE_REMARK_RESPONSE, data: approveStatusRes });
        } else {
          dispatch({ type: REJECT_REMARK_RESPONSE, data: approveStatusRes });
        }
      }
    } catch (error) {}
  };
};

export const updateMatchType = (selectedRocord: any, txnId: any, type: any) => {
  return async (dispatch: Dispatch) => {
    let params = "";
    if (type === "confirm") {
      params = `?id=${selectedRocord}&confirmMatch=true`;
    } else {
      params = `?normalMatch=true&transactionId=${txnId}`;
    }
    const apiURL = Constants.BaseURL + ApiEndPoints.updateMatchType + params;

    try {
      const updateMatchTypeRes = await axios.post(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (updateMatchTypeRes) {
        dispatch({
          type: UPDATE_MATCHTYPE__RESPONSE,
          data: updateMatchTypeRes,
        });
      }
    } catch (error) {}
  };
};

export const processTransaction = (transactionStatusId: any, value: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = "";

    switch (value) {
      case "Approve":
        apiURL =
          Constants.BaseURL +
          ApiEndPoints.approveStatusRemit +
          `/${transactionStatusId}`;
        break;
      case "Reject":
        apiURL = Constants.BaseURL + ApiEndPoints.rejectTransaction;
        break;
      case "Retry":
        apiURL =
          Constants.BaseURL +
          ApiEndPoints.retryTransaction +
          transactionStatusId;
        break;
      case "Refund":
        apiURL =
          Constants.BaseURL +
          ApiEndPoints.refundTransaction +
          transactionStatusId;
        break;
      default:
        break;
    }
    try {
      let processStatusRes = false;
      if (value === "Reject") {
        processStatusRes = await axios
          .post(apiURL, { transactionId: transactionStatusId })
          .then((response) => {
            if (response) {
              return response.data;
            } else {
              return false;
            }
          });
      } else {
        processStatusRes = await axios.post(apiURL).then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      }
      if (processStatusRes) {
        if (value === "Reject") {
          dispatch({ type: PROCESS_STATUS_REJECT, data: processStatusRes });
        } else {
          dispatch({ type: PROCESS_STATUS_RESPONSE, data: processStatusRes });
        }
      }
    } catch (error) {}
  };
};

export const getPaymentMethodList = (countryCode: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getPaymentMethod +
      `${countryCode}` +
      "/list";
    try {
      const paymentMethodList = await axios
        .get(apiURL, countryCode)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (paymentMethodList) {
        dispatch({ type: GET_PAYMENT_METHOD_LIST, data: paymentMethodList });
      }
    } catch (error) {}
  };
};

export const getComplainceInfo = (info: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.complainceCustomerInfo +
      `?senderId=${info.senderDetail}` +
      `&onBehalfSenderId=${info.onBehalfDetail}` +
      `&transactionId=${info.txnId}` +
      `&receiverId=${info.receiverId}`;

    try {
      const complainceSenderInfo = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });

      if (complainceSenderInfo) {
        dispatch({
          type: GET_COMPLAINCE_SENDER_INFO,
          data: complainceSenderInfo,
        });
      }
    } catch (error) {}
  };
};

export const getComplainceOnBehalfSenderInfo = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.complainceCustomerInfo + `/${id}`;
    try {
      const complainceOnBehalfSenderInfo = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (complainceOnBehalfSenderInfo) {
        dispatch({
          type: GET_COMPLAINCE_ON_BEHALF_SENDER_INFO,
          data: complainceOnBehalfSenderInfo,
        });
      }
    } catch (error) {}
  };
};

export const getAuditConfirmMatchInfo = (tid: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.auditConfirmMatch + tid;
    try {
      const auditConfirmMatchInfo = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (auditConfirmMatchInfo) {
        dispatch({
          type: "GET_AUDIT_CONFIRMMATCH_INFO",
          data: auditConfirmMatchInfo,
        });
      }
    } catch (error) {}
  };
};

export const getFrontDocument = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getFrontDoc + id;
    try {
      const frontDocRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (frontDocRes) {
        dispatch({ type: GET_FRONT_DOC_RES, data: frontDocRes });
      }
    } catch (error) {}
  };
};

export const getBackDocument = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBackDoc + id;
    try {
      const backDoc = await axios
        .get(apiURL, { responseType: "arraybuffer" })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (backDoc) {
        dispatch({ type: GET_BACK_DOC_RES, data: backDoc });
      }
    } catch (error) {}
  };
};

export const getStatusList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + "/remit/v1/manage/transfer/status";
    try {
      const paymentMethodList = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (paymentMethodList) {
        dispatch({ type: GET_STATUS_COUNT_DATA, data: paymentMethodList });
      }
    } catch (error) {}
  };
};

export const getStatusTableDatas = (status: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      "/remit/v1/manage/transfer/get-all-Count-details" +
      `?status=${status}`;
    try {
      const statusTablelistRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (statusTablelistRes) {
        dispatch({
          type: GET_STATUS_COUNT_TABLE_DATA,
          data: statusTablelistRes,
        });
      }
    } catch (error) {}
  };
};

export const UpdateCwFailedEdit = (status: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + "/v1/manage/transfer/status/edit";
    try {
      const CwFailedInfo = await axios.post(apiURL, status).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (CwFailedInfo) {
        dispatch({
          type: UPDATE_CUSTOMER_CW_FAILED_INFO,
          data: CwFailedInfo,
        });
      }
    } catch (error) {}
  };
};

export const resetGetStatusTableDatas = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GET_STATUS_COUNT_TABLE_DATA });
  };
};

export const resetStatusResponse=()=>{
  return async (dispatch: Dispatch) => {
    dispatch({ type:RESET_STATUS_RESPONSE });
  };
}