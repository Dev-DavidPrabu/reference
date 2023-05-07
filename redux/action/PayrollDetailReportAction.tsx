import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAYROLL_DETAIL_REPORT = "GET_PAYROLL_DETAIL_REPORT";
export const GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF =
  "GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF";
export const GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL =
  "GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL";
export const RESET_PAYROLL_DETAIL_REPORT = "RESET_PAYROLL_DETAIL_REPORT";
export const RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF =
  "RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF";
export const RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL =
  "RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL";

export const getPayrollDetailReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let transactionStartDate = filterValue.transactionStartDate
      ? `&transactionStartDate=${filterValue.transactionStartDate}`
      : `${""}`;
    let transactionEndDate = filterValue.transactionEndDate
      ? `&transactionEndDate=${filterValue.transactionEndDate}`
      : `${""}`;
    let creditingStartDate = filterValue.creditingStartDate
      ? `&creditingStartDate=${filterValue.creditingStartDate}`
      : `${""}`;
    let creditingEndDate = filterValue.creditingEndDate
      ? `&creditingEndDate=${filterValue.creditingEndDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    let postingStartDate = filterValue.postingStartDate
      ? `&postingStartDate=${filterValue.postingStartDate}`
      : `${""}`;
    let postingEndDate = filterValue.postingEndDate
      ? `&postingEndDate=${filterValue.postingEndDate}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollTxnDetailReport +
      `?${transactionStartDate}${transactionEndDate}${creditingStartDate}${creditingEndDate}${companyName}${postingStartDate}${postingEndDate}`;
    try {
      const PayrollDetailReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollDetailReportData) {
        dispatch({
          type: GET_PAYROLL_DETAIL_REPORT,
          data: PayrollDetailReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const PayrollDetailDownloadReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let transactionStartDate = filterValue.transactionStartDate
      ? `&transactionStartDate=${filterValue.transactionStartDate}`
      : `${""}`;
    let transactionEndDate = filterValue.transactionEndDate
      ? `&transactionEndDate=${filterValue.transactionEndDate}`
      : `${""}`;
    let creditingStartDate = filterValue.creditingStartDate
      ? `&creditingStartDate=${filterValue.creditingStartDate}`
      : `${""}`;
    let creditingEndDate = filterValue.creditingEndDate
      ? `&creditingEndDate=${filterValue.creditingEndDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    let postingStartDate = filterValue.postingStartDate
      ? `&postingStartDate=${filterValue.postingStartDate}`
      : `${""}`;
    let postingEndDate = filterValue.postingEndDate
      ? `&postingEndDate=${filterValue.postingEndDate}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollTxnDetailDownloadReport +
      `?fileType=${fileType}${transactionStartDate}${transactionEndDate}${creditingStartDate}${creditingEndDate}${companyName}${postingStartDate}${postingEndDate}`;
    try {
      const PayrollDetailDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollDetailDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF,
            data: PayrollDetailDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL,
            data: PayrollDetailDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetpayrollDetailReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_DETAIL_REPORT });
  };
};

export const resetpayrollDetailReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF });
  };
};
export const resetpayrollDetailReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL });
  };
};
