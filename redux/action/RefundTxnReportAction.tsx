import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const REFUND_TXN_REPORT = "REFUND_TXN_REPORT";
export const REFUND_TXN_DOWNLOAD_PDF_REPORT = "REFUND_TXN_DOWNLOAD_PDF_REPORT";
export const REFUND_TXN_DOWNLOAD_EXCEL_REPORT = "REFUND_TXN_DOWNLOAD_EXCEL_REPORT";
export const RESET_REFUND_TXN_REPORT = "RESET_REFUND_TXN_REPORT";
export const RESET_REFUND_TXN_PDF_DOWNLOAD_REPORT =
  "RESET_REFUND_TXN_PDF_DOWNLOAD_REPORT";
export const RESET_REFUND_TXN_EXCEL_DOWNLOAD_REPORT = "RESET_REFUND_TXN_EXCEL_DOWNLOAD_REPORT"

export const getRefundTxnReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.RefundTransactionReport + "?";
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let paymentMethod = filterValue.paymentMethod
      ? `paymentMethod=${filterValue.paymentMethod}`
      : `${""}`;

    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let country = filterValue.country
      ? `country=${filterValue.country}`
      : `${""}`;
    const params = {
      fromDate,
      toDate,
      paymentMethod,
      mobileNumber,
      country,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }

      return apiURL;
    };
    try {
      const RefundTxnReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (RefundTxnReports) {
        dispatch({
          type: REFUND_TXN_REPORT,
          data: RefundTxnReports.data,
        });
      }
    } catch (error) {}
  };
};

export const RefundTransactionDownloadReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let paymentMethod = filterValue.paymentMethod
      ? `&paymentMethod=${filterValue.paymentMethod}`
      : `${""}`;

    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let country = filterValue.country
      ? `&country=${filterValue.country}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.RefundTransactionDownloadReport +
      `?fileType=${fileType}${fromDate}${toDate}${paymentMethod}` +
      mobileNumber +
      country;
    try {
      const RefundTxnDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (RefundTxnDownloadRes) {
        if (fileType === "pdf") {
        dispatch({
          type: REFUND_TXN_DOWNLOAD_PDF_REPORT,
          data: RefundTxnDownloadRes?.data,
        });
      }else {
        dispatch({
          type: REFUND_TXN_DOWNLOAD_EXCEL_REPORT,
          data: RefundTxnDownloadRes?.data,
        });
    } 
  }
}catch (err) {}
};
};

export const resetRefundTxnReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REFUND_TXN_REPORT });
  };
};

export const resetRefundTxnPdfReportDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REFUND_TXN_PDF_DOWNLOAD_REPORT });
  };
};

export const resetRefundTxnExcelReportDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REFUND_TXN_EXCEL_DOWNLOAD_REPORT });
  };
};
