import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const SMS_TRANSACTION_REPORT = "SMS_TRANSACTION_REPORT";
export const SMS_TRANSACTION_REPORT_DOWNLOAD_PDF =
  "SMS_TRANSACTION_REPORT_DOWNLOAD_PDF";
export const SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL =
  "SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL";
export const RESET_SMS_TRANSACTION_REPORT = "RESET_SMS_TRANSACTION_REPORT";
export const RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_PDF =
  "RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_PDF";
export const RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL =
  "RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL";

export const getSmsTransactionReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `?fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.SmsTransactionReport +
      startDate +
      endDate +
      mobileNo;
    try {
      const getSmsTxnReportResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getSmsTxnReportResponse) {
        dispatch({
          type: SMS_TRANSACTION_REPORT,
          data: getSmsTxnReportResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const SmsTxnReportDownload = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.SmsTransactionReportDownload +
      `?fileType=${fileType}` +
      mobileNo +
      startDate +
      endDate;
    try {
      const getsmsTxnReportResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getsmsTxnReportResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: SMS_TRANSACTION_REPORT_DOWNLOAD_PDF,
            data: getsmsTxnReportResponse?.data,
          });
        } else {
          dispatch({
            type: SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL,
            data: getsmsTxnReportResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};
export const resetSmsTxnReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SMS_TRANSACTION_REPORT });
  };
};
export const resetSmsTxnReportDownlaodPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_PDF });
  };
};

export const resetSmsTxnReportDownlaodExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL });
  };
};
