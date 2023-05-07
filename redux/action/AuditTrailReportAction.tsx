import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_ALL_AUDIT_FUNCTION = "GET_ALL_AUDIT_FUNCTION";
export const GET_ALL_AUDIT_MODULE = "GET_ALL_AUDIT_MODULE";
export const AUDIT_TRIAL_DOWNLOAD_EXCEL = "AUDIT_TRIAL_DOWNLOAD_EXCEL";
export const AUDIT_TRIAL_DOWNLOAD_PDF = "AUDIT_TRIAL_DOWNLOAD_PDF";
export const RESET_AUDIT_TRIAL_EXCEL = "RESET_AUDIT_TRIAL_EXCEL";
export const RESET_AUDIT_TRIAL_PDF = "RESET_AUDIT_TRIAL_PDF";
export const RESET_ALL_AUDIT_MODULE = "RESET_ALL_AUDIT_MODULE";
export const RESET_ALL_AUDIT_FUNCTION = "RESET_ALL_AUDIT_FUNCTION";

export const getAuditFunction = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.auditTrialReportFunction +
      `?moduleId=${id}`;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_AUDIT_FUNCTION, data: response.data });
      }
    } catch (error) {}
  };
};

export const getAllAuditModule = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.auditTrialReportModule;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_AUDIT_MODULE, data: response.data });
      }
    } catch (error) {}
  };
};

export const AuditDownloadReports = (fileType: any, data: any) => {
  return async (dispatch: Dispatch) => {
    let module = data.module ? `&module=${data.module}` : `${""}`;
    let functions = data.function ? `&function=${data.function}` : `${""}`;
    let action = data.action ? `&action=${data.action}` : `${""}`;
    let fromDate = data.fromDate ? `&fromDate=${data.fromDate}` : `${""}`;
    let toDate = data.toDate ? `&toDate=${data.toDate}` : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.auditTrialDownloadReport +
      `?fileType=${fileType}` +
      module +
      functions +
      action +
      fromDate +
      toDate;
    try {
      const auditTrialDownloadRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (auditTrialDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: AUDIT_TRIAL_DOWNLOAD_PDF,
            data: auditTrialDownloadRes?.data,
          });
        } else {
          dispatch({
            type: AUDIT_TRIAL_DOWNLOAD_EXCEL,
            data: auditTrialDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetAllRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AUDIT_TRIAL_EXCEL });
    dispatch({ type: RESET_AUDIT_TRIAL_PDF });
    dispatch({ type: RESET_ALL_AUDIT_MODULE });
    dispatch({ type: RESET_ALL_AUDIT_FUNCTION });
  };
};
export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AUDIT_TRIAL_PDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AUDIT_TRIAL_EXCEL });
  };
};
