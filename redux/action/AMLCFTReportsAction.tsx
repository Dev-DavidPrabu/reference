import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_AMLCFT_REPORT = " GET_AMLCFT_REPORT";
export const GET_AMLCFT_REPORT_DOWNLAOD = "GET_AMLCFT_REPORT_DOWNLAOD";
export const RESET_AMLCFT_REPORT = "RESET_AMLCFT_REPORT";
export const RESET_AMLCFT_REPORT_DOWNLOAD = "RESET_AMLCFT_REPORT_DOWNLOAD";

export const getAMLCFTReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let idType = filterValue.IDType ? `&idType=${filterValue.IDType}` : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.AMLCFTReports +
      `?${fromDate}${toDate}${idType}` +
      mobileNumber;
    try {
      const AMLCFTReportResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (AMLCFTReportResponse) {
        dispatch({ type: GET_AMLCFT_REPORT, data: AMLCFTReportResponse });
      }
    } catch (err) {}
  };
};

export const getAMLCFTReportDownlaod = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let idType = filterValue.IDType ? `&idType=${filterValue.IDType}` : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.AMLCFTReportsDownload +
      `?fileType=${fileType}${fromDate}${toDate}${idType}` +
      mobileNumber;
    try {
      const AMLCFTReportDownloadRes = await axios
        .get(apiURL, { responseType: "arraybuffer" })
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (AMLCFTReportDownloadRes) {
        dispatch({
          type: GET_AMLCFT_REPORT_DOWNLAOD,
          data: AMLCFTReportDownloadRes,
        });
      }
    } catch (err) {}
  };
};

export const ResetAMLCFTReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AMLCFT_REPORT });
  };
};
export const ResetAMLCFTDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AMLCFT_REPORT_DOWNLOAD });
  };
};
