import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_ECDD_AML_REPORT = "GET_ECDD_AML_REPORT";
export const GET_ECDD_AML_PDF_DOWNLAOD = "GET_ECDD_AML_PDF_DOWNLAOD";
export const GET_ECDD_AML_EXCEL_DOWNLAOD = "GET_ECDD_AML_EXCEL_DOWNLAOD";
export const RESET_ECDD_AML_REPORT = "RESET_ECDD_AML_REPORT";
export const RESET_ECDD_AML_PDF_DOWNLOAD = "RESET_ECDD_AML_PDF_DOWNLOAD";
export const RESET_ECDD_AML_EXCEL_DOWNLOAD = "RESET_ECDD_AML_EXCEL_DOWNLOAD";


export const getEcddReport = (filterValue: any) => {
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
    let country = filterValue.country
      ? `&country=${filterValue.country}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.ECDDAmlReport +
      `?${fromDate}${toDate}` +
      mobileNumber +
      country;
    try {
      const ECDDReportResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (ECDDReportResponse) {
        dispatch({ type: GET_ECDD_AML_REPORT, data: ECDDReportResponse });
      }
    } catch (err) {}
  };
};

export const getEcddAmlReportDownlaod = (filterValue: any, fileType: any) => {
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
    let country = filterValue.country
      ? `&country=${filterValue.country}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.ECDDAmlReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}` +
      mobileNumber +
      country;
    try {
      const EcddReportDownloadRes = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (EcddReportDownloadRes) {
        if (fileType === "pdf") {
        dispatch({ type: GET_ECDD_AML_PDF_DOWNLAOD, data: EcddReportDownloadRes?.data });
      }else {
        dispatch({
          type: GET_ECDD_AML_EXCEL_DOWNLAOD,
          data: EcddReportDownloadRes?.data,
        });
    } 
    } 
  }catch (err) {}
};
}

export const ResetEcddReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ECDD_AML_REPORT });
  };
};
export const ResetEcddDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ECDD_AML_PDF_DOWNLOAD });
  };
};
export const ResetEcddDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ECDD_AML_EXCEL_DOWNLOAD });
  };
};
