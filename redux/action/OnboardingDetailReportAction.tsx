import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_ONBOARDING_DETAIL_REPORT = "GET_ONBOARDING_DETAIL_REPORT";
export const ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF =
  "ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF";
export const ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL =
  "ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL";
export const RESET_ONBOARDING_DETAILS_REPORT =
  "RESET_ONBOARDING_DETAILS_REPORT";
export const RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF =
  "RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF";
export const RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL =
  "RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL";

export const OnboardingDetailReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.OnboardingDetailReport + "?";
    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;
    let Brand = filterValue.brand ? `brand=${filterValue.brand}` : `${""}`;
    let CardType = filterValue.cardType
      ? `cardType=${filterValue.cardType}`
      : `${""}`;
    let Nationality = filterValue.nationality
      ? `nationality=${filterValue.nationality}`
      : `${""}`;
    let BranchName = filterValue.branchName
      ? `branchName=${filterValue.branchName}`
      : `${""}`;
    let IdType = filterValue.idType ? `idType=${filterValue.idType}` : `${""}`;
    let SourceCode = filterValue.sourceCode
      ? `sourceCode=${filterValue.sourceCode}`
      : `${""}`;
    const params = {
      toDate,
      fromDate,
      Brand,
      CardType,
      Nationality,
      BranchName,
      IdType,
      SourceCode,
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);
      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }
      return apiURL;
    };
    try {
      const getOnboardDetailReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getOnboardDetailReports) {
        dispatch({
          type: GET_ONBOARDING_DETAIL_REPORT,
          data: getOnboardDetailReports.data,
        });
      }
    } catch (error) {}
  };
};

export const DownloadOnboardDetailReport = (
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
    let nationality = filterValue.nationality
      ? `&nationality=${filterValue.nationality}`
      : `${""}`;
    let branchName = filterValue.branchName
      ? `&branchName=${filterValue.branchName}`
      : `${""}`;
    let idType = filterValue.idType ? `&idType=${filterValue.idType}` : `${""}`;
    let SourceCode = filterValue.sourceCode
      ? `&sourceCode=${filterValue.sourceCode}`
      : `${""}`;

    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.OnboardingDetailsReportDownload +
      `?fileType=${fileType}` +
      startDate +
      endDate +
      brand +
      cardType +
      nationality +
      branchName +
      idType +
      SourceCode;
    try {
      const OnboardingDetailsDownloadResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (OnboardingDetailsDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF,
            data: OnboardingDetailsDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL,
            data: OnboardingDetailsDownloadResponse?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const resetOnboardingDetailsReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_DETAILS_REPORT });
  };
};

export const resetOnboardingDetailsDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF });
  };
};

export const resetOnboardingDetailsDownloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL });
  };
};
