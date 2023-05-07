import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_RECONCILIATION_REPORT = "GET_RECONCILIATION_REPORT";
export const RESET_RECONCILIATION_REPORT = "RESET_RECONCILIATION_REPORT";
export const RECONCILIATION_REPORT_DOWNLOAD_PDF =
  "RECONCILIATION_REPORT_DOWNLOAD_PDF";
export const RECONCILIATION_REPORT_DOWNLOAD_EXCEL =
  "RECONCILIATION_REPORT_DOWNLOAD_EXCEL";
export const RESET_RECONCILIATION_REPORT_DOWNLOAD_PDF =
  "RESET_RECONCILIATION_REPORT_DOWNLOAD_PDF";
export const RESET_RECONCILIATION_REPORT_DOWNLOAD_EXCEL =
  "RESET_RECONCILIATION_REPORT_DOWNLOAD_EXCEL";

export const PrefundReconciliationReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.ReconciliationReport + "?";
    let toDate = filterValue.toDate ? `toDate=${filterValue.toDate}` : `${""}`;
    let fromDate = filterValue.fromDate
      ? `fromDate=${filterValue.fromDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `companyName=${filterValue.companyName}`
      : `${""}`;

    const params = {
      toDate,
      fromDate,
      companyName,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);
      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const getReconciliationReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getReconciliationReports) {
        dispatch({
          type: GET_RECONCILIATION_REPORT,
          data: getReconciliationReports.data,
        });
      }
    } catch (error) {}
  };
};

export const DownloadReconciliationReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let endDate = filterValue.toDate
      ? `&toDate=${filterValue.toDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.ReconciliationReportDownload +
      `?fileType=${fileType}` +
      startDate +
      endDate +
      companyName;
    try {
      const ReconciliationDownloadResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (ReconciliationDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: RECONCILIATION_REPORT_DOWNLOAD_PDF,
            data: ReconciliationDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: RECONCILIATION_REPORT_DOWNLOAD_EXCEL,
            data: ReconciliationDownloadResponse?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetReconciliationReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_RECONCILIATION_REPORT });
  };
};

export const resetReconciliationDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_RECONCILIATION_REPORT_DOWNLOAD_PDF });
  };
};

export const resetReconciliationDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_RECONCILIATION_REPORT_DOWNLOAD_EXCEL });
  };
};
