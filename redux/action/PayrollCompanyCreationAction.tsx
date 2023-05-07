import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAYROLL_COMPANY_CREATION_REPORT =
  "GET_PAYROLL_COMPANY_CREATION_REPORT";
export const GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF =
  "GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF";
export const GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL =
  "GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL";
export const RESET_PAYROLL_COMPANY_CREATION_REPORT =
  "RESET_PAYROLL_COMPANY_CREATION_REPORT";
export const RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF =
  "RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF";
export const RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL =
  "RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL";

export const getPayrollCompanyReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let companyCode = filterValue.companyCode
      ? `&companyCode=${filterValue.companyCode}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollCompanyCreationReport +
      `?${fromDate}${toDate}${companyName}${companyCode}`;
    try {
      const PayrollCompanyResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (PayrollCompanyResponse) {
        dispatch({
          type: GET_PAYROLL_COMPANY_CREATION_REPORT,
          data: PayrollCompanyResponse,
        });
      }
    } catch (err) {}
  };
};

export const getPayrollCompanyReportDownlaod = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let companyCode = filterValue.companyCode
      ? `&companyCode=${filterValue.companyCode}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollCompanyCreationDownload +
      `?fileType=${fileType}${fromDate}${toDate}${companyCode}${companyName}`;
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
            type: GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF,
            data: PayrollReportDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL,
            data: PayrollReportDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const ResetPayrollCompanyReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_COMPANY_CREATION_REPORT });
  };
};
export const ResetPayrollDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF });
  };
};
export const ResetPayrollDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL });
  };
};
