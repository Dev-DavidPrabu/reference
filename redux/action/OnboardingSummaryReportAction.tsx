import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_ONBOARDING_SUMMARY_REPORT = "GET_ONBOARDING_SUMMARY_REPORT";
export const RESET_ONBOARDING_SUMMARY_REPORT =
  "RESET_ONBOARDING_SUMMARY_REPORT";
export const ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF =
  "ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF";
export const ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL =
  "ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL";
export const RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF =
  "RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF";
export const RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL =
  "RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL";

export const OnboardingSummaryReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
    let fromDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let Brand = filterValue.brand ? `&brand=${filterValue.brand}` : `${""}`;
    let CardType = filterValue.cardType
      ? `&cardType=${filterValue.cardType}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.OnboardingSummaryReport +
      `?${fromDate}${toDate}${Brand}${CardType}`;
    try {
      const getOnboardSummaryReports = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getOnboardSummaryReports) {
        dispatch({
          type: GET_ONBOARDING_SUMMARY_REPORT,
          data: getOnboardSummaryReports,
        });
      }
    } catch (error) {}
  };
};

export const DownloadOnboardSummaryReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let brand = filterValue.brand ? `&brand=${filterValue.brand}` : `${""}`;
    let cardType = filterValue.cardType
      ? `&cardType=${filterValue.cardType}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.OnboardingSummaryReportDownload +
      `?fileType=${fileType}${startDate}${endDate}${brand}${cardType}`;
    try {
      const OnboardingSummaryDownloadResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (OnboardingSummaryDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF,
            data: OnboardingSummaryDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL,
            data: OnboardingSummaryDownloadResponse?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetOnboardingSummaryReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_SUMMARY_REPORT });
  };
};

export const resetOnboardingSummaryDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF });
  };
};

export const resetOnboardingSummaryDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL });
  };
};
