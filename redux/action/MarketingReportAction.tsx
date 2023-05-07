import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_MARKETING_REPORT = "GET_MARKETING_REPORT";
export const GET_MARKETING_DOWNLOAD_PDF_REPORT =
  "GET_MARKETING_PDF_DOWNLOAD_REPORT";
export const GET_MARKETING_DOWNLOAD_EXCEL_REPORT =
  "GET_MARKETING_EXCEL_DOWNLOAD_REPORT";
export const RESET_MARKETING_DOWNLOAD_PDF_REPORT =
  "RESET_MARKETING_PDF_DOWNLOAD_REPORT";
export const RESET_MARKETING_DOWNLOAD_EXCEL_REPORT =
  "RESET_MARKETING_EXCEL_DOWNLOAD_REPORT";
export const RESET_MARKETING_REPORT = "RESET_MARKETING_REPORT";
export const RESET_MARKETING_DOWNLOAD_REPORT =
  "RESET_MARKETING_DOWNLOAD_REPORT";

export const getMarketingReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let groupName = filterValue.GroupName
      ? `&groupName=${filterValue.GroupName}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MarketingReport +
      `?${fromDate}${toDate}${groupName}`;

    try {
      const MarketingReportData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });

      if (MarketingReportData) {
       
        dispatch({
          type: GET_MARKETING_REPORT,
          data: MarketingReportData?.data,
        });
      }
    } catch (err) {}
  };
};

export const MarketingReportDownloadReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let groupName = filterValue.groupName
      ? `&groupName=${filterValue.groupName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MarketingReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}${groupName}`;

    try {
      const MarketingReportDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });

      if (MarketingReportDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_MARKETING_DOWNLOAD_PDF_REPORT,
            data: MarketingReportDownloadRes.data,
          });
        } else {
          dispatch({
            type: GET_MARKETING_DOWNLOAD_EXCEL_REPORT,
            data: MarketingReportDownloadRes.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetMarketingReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MARKETING_REPORT });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MARKETING_DOWNLOAD_PDF_REPORT });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MARKETING_DOWNLOAD_EXCEL_REPORT });
  };
};
