import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TOPUP_RECONCILIATION_REPORT =
  "GET_TOPUP_RECONCILIATION_REPORT";
export const GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF =
  "GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF";
export const GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL =
  "GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL";
export const RESET_TOPUP_RECONCILIATION_REPORT =
  " RESET_TOPUP_RECONCILIATION_REPORT";
export const RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF =
  "RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF";
export const RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL =
  "RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL";

export const getTopupReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.TopupReconciliationReport +
      `?${fromDate}${toDate}${companyName}`;
    try {
      const TopupReportResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (TopupReportResponse) {
        dispatch({
          type: GET_TOPUP_RECONCILIATION_REPORT,
          data: TopupReportResponse,
        });
      }
    } catch (err) {}
  };
};

export const getTopupReportDownlaod = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.TopupReconciliationReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}${companyName}`;
    try {
      const TopupReportDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (TopupReportDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF,
            data: TopupReportDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL,
            data: TopupReportDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const ResetTopupReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_RECONCILIATION_REPORT });
  };
};
export const ResetTopupDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF });
  };
};

export const ResetTopupDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL });
  };
};
