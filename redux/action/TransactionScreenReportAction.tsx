import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TRANSACTION_REPORTS = "GET_TRANSACTION_REPORTS";
export const GET_TRANSACTION_DOWNLOAD_PDF = "GET_TRANSACTION_DOWNLOAD_PDF";
export const GET_TRANSACTION_DOWNLOAD_EXCEL = "GET_TRANSACTION_DOWNLOAD_EXCEL";
export const RESET_TRANSACTION_REPORT = "RESET_TRANSACTION_REPORT";
export const RESET_TRANSACTION_DOWNLOAD_PDF = "RESET_TRANSACTION_DOWNLOAD_PDF";
export const RESET_TRANSACTION_DOWNLOAD_EXCEL =
  "RESET_TRANSACTION_DOWNLOAD_EXCEL";

export const TransactionScreenReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.EndDate
      ? `toDate=${filterValue.EndDate}`
      : `${""}`;
    let ScreeningType = filterValue.ScreeningType
      ? `screeningType=${filterValue.ScreeningType}`
      : `${""}`;
    let MatchType = filterValue.MatchType
      ? `matchType=${filterValue.MatchType}`
      : `${""}`;

    let apiURL = Constants.BaseURL + ApiEndPoints.TxnScreenReport + "?";
    const params = {
      mobileNumber,
      startDate,
      endDate,
      ScreeningType,
      MatchType,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const TransactionScreenResponse = await axios
        .get(constructUrl(params))
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (TransactionScreenResponse) {
        dispatch({
          type: GET_TRANSACTION_REPORTS,
          data: TransactionScreenResponse,
        });
      }
    } catch (err) {}
  };
};

export const getTransactionScreenReportDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.EndDate
      ? `&toDate=${filterValue.EndDate}`
      : `${""}`;
    let ScreeningType = filterValue.ScreeningType
      ? `&screeningType=${filterValue.ScreeningType}`
      : `${""}`;
    let MatchType = filterValue.MatchType
      ? `&matchType=${filterValue.MatchType}`
      : `${""}`;

    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.TxnScreenReportDownload +
      `?fileType=${fileType}${startDate}${endDate}` +
      mobileNumber +
      ScreeningType +
      MatchType;
    try {
      const TransactionScreenDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (TransactionScreenDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_TRANSACTION_DOWNLOAD_PDF,
            data: TransactionScreenDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_TRANSACTION_DOWNLOAD_EXCEL,
            data: TransactionScreenDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetTransactionScreenReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_REPORT });
  };
};

export const resetTransactionScreenDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_DOWNLOAD_PDF });
  };
};

export const resetTransactionScreenDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_DOWNLOAD_EXCEL });
  };
};
