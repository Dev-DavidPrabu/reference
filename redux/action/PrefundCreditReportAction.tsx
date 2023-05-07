import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PREFUND_CREDIT_REPORT = "GET_PREFUND_CREDIT_REPORT";
export const RESET__PREFUND_CREDIT_REPORT = "RESET__PREFUND_CREDIT_REPORT";
export const PREFUND_CREDIT_DOWNLOAD_EXCEL = "PREFUND_CREDIT_DOWNLOAD_EXCEL";
export const PREFUND_CREDIT_DOWNLOAD_PDF = "PREFUND_CREDIT_DOWNLOAD_PDF";
export const RESET_PREFUND_CREDIT_DOWNLOAD_PDF =
  "RESET_PREFUND_CREDIT_DOWNLOAD_PDF";
export const RESET_PREFUND_CREDIT_DOWNLOAD_EXCEL =
  "RESET_PREFUND_CREDIT_REPORT_DOWNLOAD_EXCEL";

export const getPrefundCreditReport = (filterValue: any) => {
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
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PrefundCreditReport +
      `?${startDate}${endDate}${companyName}`;
    try {
      const PrefundCreditReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundCreditReportData) {
        dispatch({
          type: GET_PREFUND_CREDIT_REPORT,
          data: PrefundCreditReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const PrefundCreditDownloadReport = (
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
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PrefundCreditReportDownload +
      `?fileType=${fileType}${startDate}${endDate}${companyName}`;
    try {
      const PrefundCreditDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundCreditDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: PREFUND_CREDIT_DOWNLOAD_PDF,
            data: PrefundCreditDownloadRes?.data,
          });
        } else {
          dispatch({
            type: PREFUND_CREDIT_DOWNLOAD_EXCEL,
            data: PrefundCreditDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetprefundCreditReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET__PREFUND_CREDIT_REPORT });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_CREDIT_DOWNLOAD_PDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_CREDIT_DOWNLOAD_EXCEL });
  };
};
