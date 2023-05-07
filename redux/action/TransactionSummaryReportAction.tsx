import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TRANSACTION_SUMMARY_REPORT = "GET_TRANSACTION_SUMMARY_REPORT";
export const GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_PDF =
  "GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_PDF";
export const GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_EXCEL =
  "GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_EXCEL";
export const RESET_TRANSACTION_SUMMARY_REPORT =
  "RESET_TRANSACTION_SUMMARY_REPORT";
export const RESET_TRANSACTION_SUMMARY_DOWNLOAD_PDF_REPORT =
  "RESET_TRANSACTION_SUMMARY_DOWNLOAD_PDF_REPORT";
export const RESET_TRANSACTION_SUMMARY_DOWNLOAD_EXCEL_REPORT =
  "RESET_TRANSACTION_SUMMARY_DOWNLOAD_EXCEL_REPORT";

export const TransactionSummaryReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL =
      Constants.BaseURL + ApiEndPoints.TransactionSummaryReport + "?";
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let paymentMethod = filterValue.PaymentMethod
      ? `paymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;

    let country = filterValue.Country
      ? `country=${filterValue.Country}`
      : `${""}`;

    const params = {
      fromDate,
      toDate,
      paymentMethod,

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
      const getTransactionSummaryReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getTransactionSummaryReports) {
        dispatch({
          type: GET_TRANSACTION_SUMMARY_REPORT,
          data: getTransactionSummaryReports.data,
        });
      }
    } catch (error) {}
  };
};

export const TransactionSummaryDownloadReport = (
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
    let paymentMethod = filterValue.PaymentMethod
      ? `&paymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;

    let country = filterValue.Country
      ? `&country=${filterValue.Country}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.TransactionSummaryDownloadReport +
      `?fileType=${fileType}${fromDate}${toDate}${paymentMethod}` +
      country;
    try {
      const TransactionSummaryReportDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (TransactionSummaryReportDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_PDF,
            data: TransactionSummaryReportDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_EXCEL,
            data: TransactionSummaryReportDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetTransactionSummaryReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_SUMMARY_REPORT });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_SUMMARY_DOWNLOAD_PDF_REPORT });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_SUMMARY_DOWNLOAD_EXCEL_REPORT });
  };
};
