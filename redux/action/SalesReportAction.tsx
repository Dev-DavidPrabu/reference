import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_SALES_REPORT = "GET_SALES_REPORT";
export const GET_SALES_PDF_DOWNLOAD_REPORT = "GET_SALES_PDF_DOWNLOAD_REPORT";
export const GET_SALES_EXCEL_DOWNLOAD_REPORT =
  "GET_SALES_EXCEL_DOWNLOAD_REPORT";
export const RESET_SALES_REPORT = "RESET_SALES_REPORT";
export const RESET_SALES_PDF_DOWNLOAD_REPORT =
  "RESET_SALES_PDF_DOWNLOAD_REPORT";
export const RESET_SALES_EXCEL_DOWNLOAD_REPORT =
  "RESET_SALES_EXCEL_DOWNLOAD_REPORT";

export const getSalesReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let groupName = filterValue.GroupName
      ? `&groupName=${filterValue.GroupName}`
      : `${""}`;

    let cardType =
      filterValue.cardType === "" ? `ALL` : `&cardType=${filterValue.cardType}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.SalesReport +
      `?${fromDate}${toDate}${groupName}${cardType}`;
    try {
      const SalesReportData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (SalesReportData) {
        dispatch({ type: GET_SALES_REPORT, data: SalesReportData.data });
      }
    } catch (err) {}
  };
};

export const SalesReportDownloadReport = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let groupName = filterValue.groupName
      ? `&groupName=${filterValue.groupName}`
      : `${""}`;
    let cardType = filterValue.cardType
      ? `&cardType=${filterValue.cardType}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.SalesReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}${groupName}${cardType}`;
    try {
      const SalesReportDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (SalesReportDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_SALES_PDF_DOWNLOAD_REPORT,
            data: SalesReportDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_SALES_EXCEL_DOWNLOAD_REPORT,
            data: SalesReportDownloadRes?.data,
          });
        }
      }
    } catch (err) {}
  };
};
export const resetSalesReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SALES_REPORT });
  };
};

export const resetSalesReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SALES_PDF_DOWNLOAD_REPORT });
  };
};

export const resetSalesReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SALES_EXCEL_DOWNLOAD_REPORT });
  };
};
