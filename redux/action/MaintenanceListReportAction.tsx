import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_MAINTENANCE_LIST_REPORT = "GET_MAINTENANCE_LIST_REPORT";
export const GET_MAINTENANCE_LIST_DOWNLOAD_REPORT =
  "GET_MAINTENANCE_LIST_DOWNLOAD_REPORT";
export const RESET_MAINTENANCE_LIST_REPORT = "RESET_MAINTENANCE_LIST_REPORT";
export const RESET_MAINTENANCE_LIST_DOWNLOAD_REPORT =
  "RESET_MAINTENANCE_LIST_DOWNLOAD_REPORT";
export const GET_MAINTENANCE_lIST_DOWNLOAD_PDF =
  "GET_MAINTENANCE_lIST_DOWNLOAD_PDF";
export const GET_MAINTENANCE_lIST_DOWNLOAD_EXCEL =
  "GET_MAINTENANCE_lIST_DOWNLOAD_EXCEL";
export const RESET_MAINTENANCE_lIST_DOWNLOAD_EXCEL =
  "RESET_MAINTENANCE_lIST_DOWNLOAD_EXCEL";
export const RESET_MAINTENANCE_lIST_DOWNLOAD_PDF =
  "RESET_MAINTENANCE_lIST_DOWNLOAD_PDF";

export const MaintenanceListReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileno = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let endDate = filterValue.toDate
      ? `&toDate=${filterValue.toDate}`
      : `${""}`;
    let urn = filterValue.urn ? `&urn=${filterValue.urn}` : `${""}`;
    let idNumber = filterValue.idNumber
      ? `&idNumber=${filterValue.idNumber}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MaintenanceListReport +
      `?${startDate}${endDate}${mobileno}` +
      urn +
      idNumber;
    try {
      const MaintenanceListReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (MaintenanceListReportData) {
        dispatch({
          type: GET_MAINTENANCE_LIST_REPORT,
          data: MaintenanceListReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const MaintenanceListReportsDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileno = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let endDate = filterValue.toDate
      ? `&toDate=${filterValue.toDate}`
      : `${""}`;
    let urn = filterValue.urn ? `&urn=${filterValue.urn}` : `${""}`;
    let idNumber = filterValue.idNumber
      ? `&idNumber${filterValue.idNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MaintenanceListReportDownload +
      `?fileType=${fileType}${startDate}${endDate}${mobileno}` +
      urn +
      idNumber;
    try {
      const MaintenanceListDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (MaintenanceListDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_MAINTENANCE_lIST_DOWNLOAD_PDF,
            data: MaintenanceListDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_MAINTENANCE_lIST_DOWNLOAD_EXCEL,
            data: MaintenanceListDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetMaintenanceListReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MAINTENANCE_LIST_REPORT });
  };
};

export const resetMaintenanceListDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MAINTENANCE_lIST_DOWNLOAD_EXCEL });
  };
};

export const resetMaintenanceListDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MAINTENANCE_lIST_DOWNLOAD_PDF });
  };
};
