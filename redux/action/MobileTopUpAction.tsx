import { Dispatch } from "redux";
import { Constants, ApiEndPoints } from "../../Constants/Constants";
import axios from "axios";

export const MOBILE_DASHBOARD_DATA = "MOBILE_DASHBOARD_DATA";
export const RESET_MOBILE_DASHBOARD = "RESET_MOBILE_DASHBOARD";
export const MOBILE_DASHBOARD_DATA_BYSTATUS = "MOBILE_DASHBOARD_DATA_BYSTATUS";
export const MOBILE_FILTER_DATA_BYSTATUS = "MOBILE_FILTER_DATA_BYSTATUS";
export const RESET_FILTER_DATA_BYSTATUS = "RESET_FILTER_DATA_BYSTATUS";
export const RESET_MOBILE_DASHBOARD_DATA_BYSTATUS =
  "RESET_MOBILE_DASHBOARD_DATA_BYSTATUS";
export const APPROVE_MOBILE_TOPUP_REPROCESS_RESPONSE =
  "APPROVE_MOBILE_TOPUP_REPROCESS_RESPONSE";
export const APPROVE_MOBILE_TOPUP_REFUND_RESPONSE =
  "APPROVE_MOBILE_TOPUP_REFUND_RESPONSE";
export const APPROVE_MOBILE_TOPUP_CREDIT_RESPONSE =
  "APPROVE_MOBILE_TOPUP_CREDIT_RESPONSE";
export const APPROVE_MOBILE_TOPUP_FPX_REPROCESS_RESPONSE =
  "APPROVE_MOBILE_TOPUP_FPX_REPROCESS_RESPONSE";
export const APPROVE_MOBILE_TOPUP_FPX_REFUNCREDIT_RESPONSE =
  "APPROVE_MOBILE_TOPUP_FPX_REFUNCREDIT_RESPONSE";
export const APPROVE_MOBILE_TOPUP_JOMPAY_REPROCESS_RESPONSE =
  "APPROVE_MOBILE_TOPUP_JOMPAY_REPROCESS_RESPONSE";
export const APPROVE_MOBILE_TOPUP_JOMPAY_REFUNDCREDIT_RESPONSE =
  "APPROVE_MOBILE_TOPUP_JOMPAY_REFUNDCREDIT_RESPONSE";
export const MOBILE_DOCUMENT_DATA = "MOBILE_DOCUMENT_DATA";
export const MOBILE_DOCUMENT_DOWNLOAD_DATA = "MOBILE_DOCUMENT_DOWNLOAD_DATA";
export const RESET_MOBILE_DOCUMENT_DATA = "RESET_MOBILE_DOCUMENT_DATA";
export const RESET_MOBILE_DOCUMENT_DOWNLOAD = "RESET_MOBILE_DOCUMENT_DOWNLOAD";

export const getDashboardData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileDashboard;
    const topupResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (topupResponse)
      dispatch({ type: MOBILE_DASHBOARD_DATA, data: topupResponse || [] });
  };
};

export const getDashboardDataByStatus = (
  status: any,
  page: number,
  records: any
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.mobileDashboardData + `/${status}`;
    const topupDataResponse = await axios
      .post(apiURL, null, {
        params: {
          pageNo: page,
          pageSize: records,
        },
      })
      .then((response) => {
        return response?.data;
      });
    if (topupDataResponse)
      dispatch({
        type: MOBILE_DASHBOARD_DATA_BYSTATUS,
        data: topupDataResponse || [],
      });
  };
};
export const resetDashboardDataByStatus = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MOBILE_DASHBOARD_DATA_BYSTATUS });
  };
};

export const getFilterData = (body: any, pageNo: any, pageSize: any) => {
  let code = encodeURIComponent(body.mobileNumber);
  let originatorId = encodeURIComponent(body.originatorId);
  let topUpType = decodeURIComponent(body.topupType);
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.mobTopUpFilter +
      `?statusCode=${body.statusCode}&originatorType=${body.originatorType}${
        body.mobileNumber ? `&mobileNumber=${code}` : ""
      }${body.topupType ? `&topupType=${decodeURIComponent(topUpType)}` : ""}${
        body.originatorId ? `&originatorId=${originatorId}` : ""
      }${body.topupAmount ? `&topupAmount=${body.topupAmount}` : ""}${
        body.originatingTime ? `&originatingTime=${body.originatingTime}` : ""
      }`;
    const filterResponse = await axios
      .post(apiURL, body, {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
        },
      })
      .then((response) => {
        return response?.data;
      });
    if (filterResponse)
      dispatch({
        type: MOBILE_FILTER_DATA_BYSTATUS,
        data: filterResponse || [],
      });
  };
};

export const resetDashboardData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MOBILE_DASHBOARD });
  };
};
export const resetfilterDatas = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FILTER_DATA_BYSTATUS });
  };
};
export const approveMobileTopupReprocess = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileTopupReprocess;
    try {
      const approveMobileTopupRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveMobileTopupRes) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_REPROCESS_RESPONSE,
          data: approveMobileTopupRes,
        });
      }
    } catch (error) {}
  };
};
export const approveMobileTopupRefund = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileTopupRefund;
    try {
      const approveMobileTopupRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveMobileTopupRes) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_REFUND_RESPONSE,
          data: approveMobileTopupRes,
        });
      }
    } catch (error) {}
  };
};
export const approveMobileTopupCredit = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileTopupRefund;
    try {
      const approveMobileTopupRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveMobileTopupRes) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_CREDIT_RESPONSE,
          data: approveMobileTopupRes,
        });
      }
    } catch (error) {}
  };
};
export const getFpxReprocessResponse = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.fpxReprocess;
    try {
      const fpxReprocessResponse = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (fpxReprocessResponse) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_FPX_REPROCESS_RESPONSE,
          data: fpxReprocessResponse,
        });
      }
    } catch (error) {}
  };
};
export const getFpxRefundCreditResponse = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.fpxRefundCredit;
    try {
      const fpxRefundCreditResponse = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (fpxRefundCreditResponse) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_FPX_REFUNCREDIT_RESPONSE,
          data: fpxRefundCreditResponse,
        });
      }
    } catch (error) {}
  };
};
export const getJompayReprocessResponse = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.jompayReprocess;
    try {
      const jompayReprocessResponse = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (jompayReprocessResponse) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_JOMPAY_REPROCESS_RESPONSE,
          data: jompayReprocessResponse,
        });
      }
    } catch (error) {}
  };
};
export const getJompayRefundCreditResponse = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.jompayRefundCredit;
    try {
      const jompayRefundCreditResponse = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (jompayRefundCreditResponse) {
        dispatch({
          type: APPROVE_MOBILE_TOPUP_JOMPAY_REFUNDCREDIT_RESPONSE,
          data: jompayRefundCreditResponse,
        });
      }
    } catch (error) {}
  };
};
export const getDocumentfileView = (type: any, id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.mobileDataFileView;
    const viewFileResponse = await axios
      .get(apiURL, {
        params: {
          id: id,
          type: type,
        },
      })
      .then((response) => {
        return response?.data;
      });
    if (viewFileResponse)
      dispatch({ type: MOBILE_DOCUMENT_DATA, data: viewFileResponse || [] });
  };
};
export const getDocumentfileDownload = (type: any, id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.mobileDataFileDownload +
      `?id=${id}&type=${type}`;
    const downloadFileResponse = await axios.get(apiURL).then((response) => {
      return response;
    });
    if (downloadFileResponse?.data?.error) {
      if (downloadFileResponse) {
        dispatch({
          type: MOBILE_DOCUMENT_DOWNLOAD_DATA,
          data: downloadFileResponse || [],
        });
      }
    } else {
      var buf = Buffer.from(JSON.stringify(downloadFileResponse?.data));
      if (downloadFileResponse) {
        dispatch({ type: MOBILE_DOCUMENT_DOWNLOAD_DATA, data: buf || [] });
      }
    }
  };
};

export const resetDocumentFileData = (type: any) => {
  return async (dispatch: Dispatch) => {
    if (type === "view") {
      dispatch({ type: RESET_MOBILE_DOCUMENT_DATA });
    } else {
      dispatch({ type: RESET_MOBILE_DOCUMENT_DOWNLOAD });
    }
  };
};
