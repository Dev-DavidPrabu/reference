import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";
export const GET_DAILY_TRANSACTION_REPORTS = "GET_DAILY_TRANSACTION_REPORTS";
export const GET_DAILY_TRANSACTION_DOWNLOAD_PDF_REPORTS =
  "GET_DAILY_TRANSACTION_DOWNLOAD_PDF_REPORTS";
export const GET_DAILY_TRANSACTION_DOWNLOAD_EXCEL_REPORTS =
  "GET_DAILY_TRANSACTION_DOWNLOAD_EXCEL_REPORTS";
export const RESET_DAILY_TRANSACTION_DOWNALOD_PDF =
  "RESET_DAILY_TRANSACTION_DOWNALOD_PDF";
export const RESET_DAILY_TRANSACTION_DOWNALOD_EXCEL =
  "RESET_DAILY_TRANSACTION_DOWNALOD_EXCEL";
export const RESET_DAILY_TRANSACTION_REPORTS =
  "RESET_DAILY_TRANSACTION_REPORTS";

export const getDailyTransactionReportAction = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let Date = filterValue.Date ? `inputDate=${filterValue.Date}` : `${""}`;
    let transactionRef = filterValue.TransactionRefNo
      ? `transactionReferenceNumber=${filterValue.TransactionRefNo}`
      : `${""}`;
    let paymentMethod = filterValue.PaymentMethod
      ? `paymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;
    let apiURL = Constants.BaseURL + ApiEndPoints.DailyTransactionReports + "?";
    const params = { mobileNumber, transactionRef, paymentMethod, Date };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const DailyTransactionReport = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (DailyTransactionReport) {
        dispatch({
          type: GET_DAILY_TRANSACTION_REPORTS,
          data: DailyTransactionReport,
        });
      }
    } catch (err) {}
  };
};

export const getDailyTransactionDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.inputCode + filterValue.mobileNumber}`
      : `${""}`;
    let transactionRef = filterValue.TransactionRefNo
      ? `&transactionReferenceNumber=${filterValue.TransactionRefNo}`
      : `${""}`;
    let Date = filterValue.Date ? `&inputDate=${filterValue.Date}` : `${""}`;
    let paymentMethod = filterValue.PaymentMethod
      ? `&PaymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.DailyTransactionDownloadReports +
      `?fileType=${fileType}${Date}${paymentMethod}` +
      mobileNumber +
      transactionRef;
    try {
      const DailyTransactionDownloadsReport = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (DailyTransactionDownloadsReport) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_DAILY_TRANSACTION_DOWNLOAD_PDF_REPORTS,
            data: DailyTransactionDownloadsReport?.data,
          });
        } else {
          dispatch({
            type: GET_DAILY_TRANSACTION_DOWNLOAD_EXCEL_REPORTS,
            data: DailyTransactionDownloadsReport?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetDailyTransactionReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DAILY_TRANSACTION_REPORTS });
  };
};

export const resetDailyTransactionDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DAILY_TRANSACTION_DOWNALOD_PDF });
  };
};

export const resetDailyTransactionDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DAILY_TRANSACTION_DOWNALOD_EXCEL });
  };
};
