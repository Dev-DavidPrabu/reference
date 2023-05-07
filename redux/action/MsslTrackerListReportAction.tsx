import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_MSSLTRACKER_LIST_REPORT = "GET_MSSLTRACKER_LIST_REPORT";
export const GET_MSSLTRACKER_LIST_DOWNLOAD = "GET_MSSLTRACKER_LIST_DOWNLOAD";
export const RESET_MSSLTRACKER_LIST_REPORT = "RESET_MSSLTRACKER_LIST_REPORT";
export const RESET_MSSLTRACKER_LIST_DOWNLOAD =
  "RESET_MSSLTRACKER_LIST_DOWNLOAD";

export const getMsslTrackerList = (filterValue: any) => {
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
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MsslTrackerListReport +
      `?${fromDate}${toDate}` +
      mobileNumber;
    try {
      const MSSLTrackerReportResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (MSSLTrackerReportResponse) {
        dispatch({
          type: GET_MSSLTRACKER_LIST_REPORT,
          data: MSSLTrackerReportResponse,
        });
      }
    } catch (err) {}
  };
};

export const getMsslTrackerReportDownlaod = (
  filterValue: any,
  fileType: any
) => {
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
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.MsslTrackerListDownload +
      `?fileType=${fileType}${fromDate}${toDate}` +
      mobileNumber;
    try {
      const MsslTrackerReportDownloadRes = await axios
        .get(apiURL, { responseType: "arraybuffer" })
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (MsslTrackerReportDownloadRes) {
        dispatch({
          type: GET_MSSLTRACKER_LIST_DOWNLOAD,
          data: MsslTrackerReportDownloadRes,
        });
      }
    } catch (err) {}
  };
};

export const ResetMsslTrackerReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MSSLTRACKER_LIST_REPORT });
  };
};
export const ResetMsslTrackerReportPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_MSSLTRACKER_LIST_DOWNLOAD });
  };
};
