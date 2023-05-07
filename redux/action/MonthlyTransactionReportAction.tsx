import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_MONTHLY_TRANSACTION_REPORTS =
  "GET_MONTHLY_TRANSACTION_REPORTS";
export const GET_MONTHLY_TRANSACTION_DOWNLOAD_PDF =
  "GET_MONTHLY_TRANSACTION_DOWNLOAD_PDF";
export const GET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL =
  "GET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL";
export const RESET_MONTHLY_TRANSACTION = "RESET_MONTHLY_TRANSACTION";
export const RESET_MONTHLY_TRANSACTION_DOWNLOAD_PDF =
  "RESET_MONTHLY_TRANSACTION_DOWNLOAD_PDF";
export const RESET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL =
  "RESET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL";

export const getMonthlyTransactionReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let paymentMethod = filterValue.PaymentMethod
      ? `paymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;
    let MonthYear = filterValue.MonthYear
      ? `monthYear=${filterValue.MonthYear}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL + ApiEndPoints.MonthlyTransactionReport + "?";
    const params = { mobileNumber, MonthYear, paymentMethod };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const MonthlyTransactionResponse = await axios
        .get(constructUrl(params))
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (MonthlyTransactionResponse) {
        dispatch({
          type: GET_MONTHLY_TRANSACTION_REPORTS,
          data: MonthlyTransactionResponse,
        });
      }
    } catch (err) {}
  };
};

export const getMonthlyTransactionReportDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.inputCode + filterValue.mobileNumber}`
      : `${""}`;
    let paymentMethod = filterValue.PaymentMethod
      ? `&PaymentMethod=${filterValue.PaymentMethod}`
      : `${""}`;
    let MonthYear = filterValue.MonthYear
      ? `&monthYear=${filterValue.MonthYear}`
      : `${""}`;

    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.MonthlyTransactionDownloadReports +
      `?fileType=${fileType}${MonthYear}${paymentMethod}` +
      mobileNumber;
    try {
      const MonthlyTransactionDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (MonthlyTransactionDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_MONTHLY_TRANSACTION_DOWNLOAD_PDF,
            data: MonthlyTransactionDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL,
            data: MonthlyTransactionDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetMonthlyTransactionReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MONTHLY_TRANSACTION });
  };
};

export const resetMonthlyTransactionDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MONTHLY_TRANSACTION_DOWNLOAD_PDF });
  };
};

export const resetMonthlyTransactionDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL });
  };
};
