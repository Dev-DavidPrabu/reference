import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_MIRS_DECLINED_TRANSACTION_REPORT =
  "MIRS_DECLINED_TRANSACTION_REPORT";
export const GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_PDF =
  "GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_PDF";
export const GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_EXCEL =
  "GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_EXCEL";
export const RESET_DECLINED_TRANSACTION = "RESET_DECLINED_TRANSACTION";
export const RESET_DECLINED_TRANSACTION_DOWNLOAD_PDF =
  "RESET_DECLINED_TRANSACTION_DOWNLOAD_PDF";
export const RESET_DECLINED_TRANSACTION_DOWNLOAD_EXCEL =
  "RESET_DECLINED_TRANSACTION_DOWNLOAD_EXCEL";

export const getMirsDeclinedTransaction = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let paymentMethod = filterValue.paymentMode
      ? `paymentMethod=${filterValue.paymentMode}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let country = filterValue.country
      ? `country=${filterValue.country}`
      : `${""}`;

    let apiURL =
      Constants.BaseURL + ApiEndPoints.MirsDeclinedTransactionReports + "?";
    const params = { mobileNumber, fromDate, paymentMethod, toDate, country };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);
      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const MirsDeclinedTransactionRes = await axios
        .get(constructUrl(params))
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (MirsDeclinedTransactionRes) {
        dispatch({
          type: GET_MIRS_DECLINED_TRANSACTION_REPORT,
          data: MirsDeclinedTransactionRes,
        });
      }
    } catch (err) {}
  };
};

export const getMirsDeclinedTransactionPdf = (
  filterValue: any,
  fileType: string
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.endDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.startDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let paymentMethod = filterValue.paymentMode
      ? `&paymentMethod=${filterValue.paymentMode}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let country = filterValue.countryDescription
      ? `&country=${filterValue.countryDescription}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MirsDeclinedTransactionDownload +
      `?fileType=${fileType}${fromDate}${toDate}${paymentMethod}` +
      mobileNumber +
      country;
    try {
      const MirsDeclinedDownloadReport = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (MirsDeclinedDownloadReport) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_PDF,
            data: MirsDeclinedDownloadReport?.data,
          });
        } else {
          dispatch({
            type: GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_EXCEL,
            data: MirsDeclinedDownloadReport?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetMirsDeclinedTransaction = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DECLINED_TRANSACTION });
  };
};

export const resetMirsDeclinedTransactionPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DECLINED_TRANSACTION_DOWNLOAD_PDF });
  };
};

export const resetMirsDeclinedTransactionExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DECLINED_TRANSACTION_DOWNLOAD_EXCEL });
  };
};
