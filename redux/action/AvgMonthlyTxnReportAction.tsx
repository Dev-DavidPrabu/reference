import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_AVG_MONTHLY_TRANSACTION_REPORT =
  "GET_AVG_MONTHLY_TRANSACTION_REPORT";
export const GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF =
  "GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF";
export const GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL =
  "GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL";
export const RESET_AVG_MONTHLY_TRANSACTION = "RESET_AVG_MONTHLY_TRANSACTION";
export const RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF =
  "RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF";
export const RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL =
  "RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL";

export const getAvgMonthlyTransactionReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `toDate=${filterValue.toDate}` : `${""}`;
    let status = filterValue.status ? `status=${filterValue.status}` : `${""}`;
    let transactionType = filterValue.transactionType
      ? `transactionType=${filterValue.transactionType}`
      : `${""}`;

    let apiURL = Constants.BaseURL + ApiEndPoints.AvgMonthlyTxnReport + "?";
    const params = { fromDate, toDate, status, transactionType };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const AvgMonthlyTransactionResponse = await axios
        .get(constructUrl(params))
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (AvgMonthlyTransactionResponse) {
        dispatch({
          type: GET_AVG_MONTHLY_TRANSACTION_REPORT,
          data: AvgMonthlyTransactionResponse,
        });
      }
    } catch (err) {}
  };
};

export const getAvgMonthlyTransactionReportDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let status = filterValue.status ? `&status=${filterValue.status}` : `${""}`;
    let transactionType = filterValue.transactionType
      ? `&transactionType=${filterValue.transactionType}`
      : `${""}`;

    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.AvgMonthlyTxnReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}` +
      status +
      transactionType;
    try {
      const AvgMonthlyTransactionDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (AvgMonthlyTransactionDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF,
            data: AvgMonthlyTransactionDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL,
            data: AvgMonthlyTransactionDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetAvgMonthlyTransactionReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AVG_MONTHLY_TRANSACTION });
  };
};

export const resetAvgMonthlyTransactionDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF });
  };
};

export const resetAvgMonthlyTransactionDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL });
  };
};
