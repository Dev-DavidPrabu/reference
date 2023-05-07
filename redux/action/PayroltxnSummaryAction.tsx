import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAYROLL_TXN_SUMMARY_REPORT = "GET_PAYROLL_TXN_SUMMARY_REPORT";
export const GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_PDF =
  "GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_PDF";
export const GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_EXCEL =
  "GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_EXCEL";
export const RESET_PAYROLL_TXN_SUMMARY_REPORT =
  "RESET_PAYROLL_TXN_SUMMARY_REPORT";
export const RESET_PAYROLL_TXN_SUMMARY_PDF_DOWNLOAD =
  "RESET_PAYROLL_TXN_SUMMARY_PDF_DOWNLOAD";
export const RESET_PAYROLL_TXN_SUMMARY_EXCEL_DOWNLOAD =
  "RESET_PAYROLL_TXN_SUMMARY_EXCEL_DOWNLOAD";

export const getPayrolltxnSummaryReport = (filterValue: any) => {
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
      ApiEndPoints.PayrollTxnSummaryReport +
      `?${fromDate}${toDate}` +
      companyName;
    try {
      const PayrollSummaryResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (PayrollSummaryResponse) {
        dispatch({
          type: GET_PAYROLL_TXN_SUMMARY_REPORT,
          data: PayrollSummaryResponse,
        });
      }
    } catch (err) {}
  };
};

export const getPayrollTxnSummaryDownlaod = (
  filterValue: any,
  fileType: any
) => {
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
      ApiEndPoints.PayrollTxnSummaryReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}` +
      companyName;
    try {
      const PayrollReportDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollReportDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_PDF,
            data: PayrollReportDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_EXCEL,
            data: PayrollReportDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const ResetPayrollSummaryReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_SUMMARY_REPORT });
  };
};
export const ResetPayrollSummaryDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_SUMMARY_PDF_DOWNLOAD });
  };
};

export const ResetPayrollSummaryDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_SUMMARY_EXCEL_DOWNLOAD });
  };
};
