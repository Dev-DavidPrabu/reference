import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_REJECTED_TRANSACTION_REPORT =
  "GET_REJECTED_TRANSACTION_REPORT";
export const GET_REJETCED_TRANSACTION_DOWNLOAD =
  "GET_REJETCED_TRANSACTION_DOWNLOAD";
export const RESET_REJECTED_TRANSACTION_REPORT =
  "RESET_REJECTED_TRANSACTION_REPORT";
export const RESET_REJECTED_TRANSACTION_DOWNLOAD =
  "RESET_REJECTED_TRANSACTION_DOWNLOAD";
export const RESET_REJECTED_TRANSACTION_DOWNLOADPDF =
  "RESET_REJECTED_TRANSACTION_DOWNLOADPDF";
export const RESET_REJECTED_TRANSACTION_DOWNLOADEXCEL =
  "RESET_REJECTED_TRANSACTION_DOWNLOADEXCEL";
export const GET_REJETCED_TRANSACTION_DOWNLOADEXCEL =
  "GET_REJETCED_TRANSACTION_DOWNLOADEXCEL";

export const getRejectedTransactionReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startdDate
      ? `fromDate=${filterValue.startdDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let transactionRef = filterValue.transactionRefNo
      ? `transactionReferenceNumber=${filterValue.transactionRefNo}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.inputCode}${filterValue.mobileNumber}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL + ApiEndPoints.RejectedTransactionReports + "?";
    const params = { transactionRef, fromDate, toDate, mobileNumber };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    
    try {
      const RejectedTransactionResponse = await axios
        .get(constructUrl(params))
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (RejectedTransactionResponse) {
        dispatch({
          type: GET_REJECTED_TRANSACTION_REPORT,
          data: RejectedTransactionResponse,
        });
      }
    } catch (err: any) {}
  };
};
export const getRejectedTransactionDownload = (
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
    let transactionRef = filterValue.transactionRefNo
      ? `&transactionReferenceNumber=${filterValue.transactionRefNo}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.inputCode}${filterValue.mobileNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.RejectedTransactionDownloadReports +
      `?fileType=${fileType}` +
      fromDate +
      toDate +
      transactionRef +
      mobileNumber;
    try {
      const RejectedTransactionPdfRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (RejectedTransactionPdfRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_REJETCED_TRANSACTION_DOWNLOAD,
            data: RejectedTransactionPdfRes.data,
          });
        } else {
          dispatch({
            type: GET_REJETCED_TRANSACTION_DOWNLOADEXCEL,
            data: RejectedTransactionPdfRes.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetRejectedTransaction = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REJECTED_TRANSACTION_REPORT });
  };
};

export const resetRejectedTransactionPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REJECTED_TRANSACTION_DOWNLOAD });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REJECTED_TRANSACTION_DOWNLOADPDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_REJECTED_TRANSACTION_DOWNLOADEXCEL });
  };
};
