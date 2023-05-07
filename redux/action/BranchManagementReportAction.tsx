import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_BRANCH_MANAGEMENT_REPORT = "GET_BRACH_MANAGEMENT_REPORT";
export const GET_BRANCH_REPORT_DOWNLOAD_PDF = "GET_BRANCH_REPORT_DOWNLOAD_PDF";
export const GET_BRANCH_REPORT_DOWNLOAD_EXCEL =
  "GET_BRANCH_REPORT_DOWNLOAD_EXCEL";
export const RESET_BRANCH_MANAGEMENT_REPORT = " RESET_BRANCH_MANAGEMENT_REPORT";
export const RESET_BRANCH_MANAGEMENT_DOWNLOAD_PDF =
  "RESET_BRANCH_MANAGEMENT_DOWNLOAD_PDF";
export const RESET_BRANCH_MANAGEMENT_DOWNLOAD_EXCEL =
  "RESET_BRANCH_MANAGEMENT_DOWNLOAD_EXCEL";

export const getBranchManagementReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let branchCode = filterValue.BranchCode
      ? `branchCode=${filterValue.BranchCode}`
      : `${""}`;
    let mid = filterValue.MID ? `mid=${filterValue.MID}` : `${""}`;
    let tid = filterValue.TID ? `tid=${filterValue.TID}` : `${""}`;
    let agentGroup = filterValue.AgentGroup
      ? `agentGroup=${filterValue.AgentGroup}`
      : `${""}`;
    let apiURL = Constants.BaseURL + ApiEndPoints.BranchManagementReports + "?";
    const params = {
      mobileNumber,
      fromDate,
      toDate,
      branchCode,
      mid,
      tid,
      agentGroup,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };

    try {
      const BranchManagementResponse = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (BranchManagementResponse) {
        dispatch({
          type: GET_BRANCH_MANAGEMENT_REPORT,
          data: BranchManagementResponse,
        });
      }
    } catch (err: any) {}
  };
};

export const getBranchManagementDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.inputCode + filterValue.mobileNumber}`
      : `${""}`;
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let branchCode = filterValue.BranchCode
      ? `&branchCode=${filterValue.BranchCode}`
      : `${""}`;
    let mid = filterValue.MID ? `&mid=${filterValue.MID}` : `${""}`;
    let tid = filterValue.TID ? `&tid=${filterValue.TID}` : `${""}`;
    let agentGroup = filterValue.AgentGroup
      ? `&agentGroup=${filterValue.AgentGroup}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.BranchManagementDownloadReports +
      `?fileType=${fileType}` +
      mobileNumber +
      fromDate +
      toDate +
      branchCode +
      mid +
      tid +
      agentGroup;

    try {
      const BranchDownloadsReport = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (BranchDownloadsReport) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_BRANCH_REPORT_DOWNLOAD_PDF,
            data: BranchDownloadsReport?.data,
          });
        } else {
          dispatch({
            type: GET_BRANCH_REPORT_DOWNLOAD_EXCEL,
            data: BranchDownloadsReport?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetBranchManagementReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_BRANCH_MANAGEMENT_REPORT });
  };
};

export const resetBranchDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_BRANCH_MANAGEMENT_DOWNLOAD_PDF });
  };
};

export const resetBranchDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_BRANCH_MANAGEMENT_DOWNLOAD_EXCEL });
  };
};
