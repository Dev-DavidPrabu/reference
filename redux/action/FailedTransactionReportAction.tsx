import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_FAILED_TRANSACTION_REPORT = "GET_FAILED_TRANSACTION_REPORT";
export const GET_FAILED_TRANSACTION_DOWNLOAD_PDF_REPORT =
  "GET_FAILED_TRANSACTION_DOWNLOAD_PDF_REPORT";
export const GET_FAILED_TRANSACTION_DOWNLOAD_EXCEL_REPORT =
  "GET_FAILED_TRANSACTION_DOWNLOAD_EXCEL_REPORT";
export const RESET_FAILED_TRANSACTION_REPORT =
  "RESET_FAILED_TRANSACTION_REPORT";
export const RESET_FAILED_TRANSACTION_REPORT_PDF_DOWNLOAD =
  "RESET_FAILED_TRANSACTION_REPORT_PDF_DOWNLOAD";
export const RESET_FAILED_TRANSACTION_REPORT_EXCEL_DOWNLOAD =
  "RESET_FAILED_TRANSACTION_REPORT_EXCEL_DOWNLOAD";
export const RESET_FAILED_TRANSACTION_REPORT_DOWNLOAD =
  "RESET_FAILED_TRANSACTION_REPORT_DOWNLOAD";

export const FailedTransactionReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL =
      Constants.BaseURL + ApiEndPoints.FailedTransactionReports + "?";

    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let country = filterValue.country
      ? `country=${filterValue.country}`
      : `${""}`;
    let paymentMode = filterValue.paymentMethod
      ? `paymentMode=${filterValue.paymentMethod}` 
      : `${""}`;
    let idNumber = filterValue.idNumber
      ? `idNumber=${filterValue.idNumber}`
      : `${""}`;
    let transactionReferenceNumber = filterValue.txnRefNo
      ? `transactionReferenceNumber=${filterValue.txnRefNo}`
      : `${""}`;

    const params = {
      mobileNumber,
      fromDate,
      toDate,
      country,
      paymentMode,
      idNumber,
      transactionReferenceNumber,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }

      return apiURL;
    };

    try {
      const getFailedTransactionReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getFailedTransactionReports) {
        dispatch({
          type: GET_FAILED_TRANSACTION_REPORT,
          data: getFailedTransactionReports.data,
        });
      }
    } catch (error) {}
  };
};

export const FailedTransactionReportsDownload = (
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
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let country = filterValue.country
      ? `&country = ${filterValue.country}`
      : `${""}`;
    let paymentMode = filterValue.paymentMethod
      ? `&paymentMode=${filterValue.paymentMethod}`
      : `${""}`;
    let IdNo = filterValue.idNumber
      ? `&idNumber = ${filterValue.idNumber}`
      : `${""}`;
    let transactionRefNo = filterValue.transactionReferenceNumber
      ? `&transactionReferenceNumber = ${filterValue.transactionReferenceNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.FailedTransactionDownloadReports +
      `?fileType=${fileType}` +
      fromDate +
      toDate +
      mobileNumber +
      country +
      paymentMode +
      IdNo +
      transactionRefNo;

    try {
      const FailedTransactionDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (FailedTransactionDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_FAILED_TRANSACTION_DOWNLOAD_PDF_REPORT,
            data: FailedTransactionDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_FAILED_TRANSACTION_DOWNLOAD_EXCEL_REPORT,
            data: FailedTransactionDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetFailedTransactionReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FAILED_TRANSACTION_REPORT });
  };
};

export const resetFailedTransactionReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FAILED_TRANSACTION_REPORT_PDF_DOWNLOAD });
  };
};

export const resetFailedTransactionReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FAILED_TRANSACTION_REPORT_EXCEL_DOWNLOAD });
  };
};
export const resetFailedTransactionReportDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_FAILED_TRANSACTION_REPORT_DOWNLOAD });
  };
};
