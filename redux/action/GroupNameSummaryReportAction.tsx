import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_GROUPNAME_SUMMARY_REPORT = "GET_GROUPNAME_SUMMARY_REPORT";
export const RESET_GROUPNAME_SUMMARY_REPORT = "RESET_GROUPNAME_SUMMARY_REPORT";
export const GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD =
  "GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD";
export const GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD =
  "GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD"; 
export const RESET_GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD =
  "RESET_GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD";
  export const RESET_GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD =
  "RESET_GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD";

export const GroupNameSummaryReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.GroupNameSummaryReport + "?";
    let toDate = filterValue.toDate ? `toDate=${filterValue.toDate}` : `${""}`;
    let fromDate = filterValue.fromDate
      ? `fromDate=${filterValue.fromDate}`
      : `${""}`;
    let groupName = filterValue.groupName
      ? `groupName=${filterValue.groupName}`
      : `${""}`;

    const params = {
      toDate,
      fromDate,
      groupName,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);
      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const getGroupNameSummaryReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getGroupNameSummaryReports) {
        dispatch({
          type: GET_GROUPNAME_SUMMARY_REPORT,
          data: getGroupNameSummaryReports.data,
        });
      }
    } catch (error) {}
  };
};

export const DownloadGroupNameSummaryReport = (
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
    let groupName = filterValue.groupName
      ? `&groupName=${filterValue.groupName}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.GroupNameSummaryReportDownload +
      `?fileType=${fileType}` +
      startDate +
      endDate +
      groupName;
    try {
      const GroupNameSummaryDownloadResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (GroupNameSummaryDownloadResponse) {
        if (fileType === "pdf") {
        dispatch({
          type: GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD,
          data: GroupNameSummaryDownloadResponse?.data,
        });
      }else {
        dispatch({
          type: GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD,
          data: GroupNameSummaryDownloadResponse?.data,
        });
    } 
    } 
  }catch (err) {}
};
}

export const resetGroupNameSummaryReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GROUPNAME_SUMMARY_REPORT });
  };
};

export const resetGroupNameSummaryDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD });
  };
};

export const resetGroupNameSummaryDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD });
  };
};