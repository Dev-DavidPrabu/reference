import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_CUSTOMER_SCREENING_REPORT = "GET_CUSTOMER_SCREENING_REPORT";
export const GET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT =
  "GET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT";
export const GET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT =
  "GET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT";
export const RESET_CUSTOMER_SCREENING_REPORT =
  "RESET_CUSTOMER_SCREENING_REPORT";
export const RESET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT =
  "RESET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT";
export const RESET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT =
  "RESET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT"; 

export const getCustomerScreeningReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let screeningType = filterValue.ScreeningType
      ? `&screeningType=${filterValue.ScreeningType}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.CustomerScreeningReport +
      `?${fromDate}${toDate}${mobileNumber}${screeningType}`;
    try {
      const CustomerScreeningReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (CustomerScreeningReportData) {
        dispatch({
          type: GET_CUSTOMER_SCREENING_REPORT,
          data: CustomerScreeningReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const CustomerScreeningDownloadReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let screeningType = filterValue.screeningType
      ? `&screeningType=${filterValue.screeningType}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.CustomerScreeningDownloadReport +
      `?fileType=${fileType}${fromDate}${toDate}${mobileNumber}${screeningType}`;
    try {
      const CustomerScreeningReportDownloadRes = await axios
        .get(apiURL,)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (CustomerScreeningReportDownloadRes) {
        if (fileType === "pdf") {
        dispatch({
          type: GET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT,
          data: CustomerScreeningReportDownloadRes?.data,
        });
      }else {
        dispatch({
          type: GET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT,
          data: CustomerScreeningReportDownloadRes?.data,
        });
      }
    }
  } catch (error) {}
};
};

export const resetCustomerScreeningReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_SCREENING_REPORT });
  };
};

export const resetCustomerScreeingReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT });
  };
};

export const resetCustomerScreeingReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type:RESET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT });
  };
};
