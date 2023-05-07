import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_EXPIRING_REPORTS = "GET_EXPIRING_REPORTS";
export const RESET_EXPIRING_REPORTS = "RESET_EXPIRING_REPORTS";
export const ID_EXPIRING_DOWNLOAD_PDF = "ID_EXPIRING_DOWNLOAD_PDF";
export const RESET_EXPIRING_REPORTS_DOWNLOAD_PDF =
  "RESET_EXPIRING_REPORTS_DOWNLOAD_PDF";
export const ID_EXPIRING_DOWNLOAD_EXCEL = "ID_EXPIRING_DOWNLOAD_EXCEL";
export const RESET_EXPIRING_REPORTS_DOWNLOAD_EXCEL =
  "RESET_EXPIRING_REPORTS_DOWNLOAD_EXCEL";

export const getIdExpiringReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.enddate
      ? `&toDate=${filterValue.enddate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getIDExpiringReports +
      "?" +
      startDate +
      endDate +
      mobileNumber;
    try {
      const expiringReportsRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (expiringReportsRes) {
        dispatch({ type: GET_EXPIRING_REPORTS, data: expiringReportsRes.data });
      }
    } catch (error) {}
  };
};

export const resetIdExpiringReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EXPIRING_REPORTS });
  };
};

export const IdexpiringDownloadReports = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.idExpiringDownloadData +
      `?fileType=${fileType}` +
      startDate +
      endDate +
      mobileNumber;
    try {
      const idExpiringDownload = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (idExpiringDownload) {
        if (fileType === "pdf") {
          dispatch({
            type: ID_EXPIRING_DOWNLOAD_PDF,
            data: idExpiringDownload?.data,
          });
        } else {
          dispatch({
            type: ID_EXPIRING_DOWNLOAD_EXCEL,
            data: idExpiringDownload?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetIdExpiringReportsDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EXPIRING_REPORTS_DOWNLOAD_PDF });
  };
};

export const resetIdExpiringReportsDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EXPIRING_REPORTS_DOWNLOAD_EXCEL });
  };
};
