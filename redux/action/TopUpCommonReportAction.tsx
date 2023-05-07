import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TOPUP_COMMON_REPORT = "GET_TOPUP_COMMON_REPORT";
export const GET_TOPUP_COMMON_REPORT_DOWNLOAD_PDF_REPORT =
  "GET_TOPUP_COMMON_REPORT_DOWNLOAD_PDF_REPORT";
export const GET_TOPUP_COMMON_REPORT_DOWNLOAD_EXCEL_REPORT =
  "GET_TOPUP_COMMON_REPORT_DOWNLOAD_EXCEL_REPORT";
export const RESET_TOPUP_COMMON_REPORT =
  "RESET_TOPUP_COMMON_REPORT";
export const RESET_TOPUP_COMMON_REPORT_PDF_DOWNLOAD =
  "RESET_TOPUP_COMMON_REPORT_PDF_DOWNLOAD";
export const RESET_TOPUP_COMMON_REPORT_EXCEL_DOWNLOAD =
  "RESET_TOPUP_COMMON_REPORT_EXCEL_DOWNLOAD";


export const TopUpCommonReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL =
      Constants.BaseURL + ApiEndPoints.TopUpCommonReport + "?";

    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let urn = filterValue.WalletIDURN
      ? `urn=${filterValue.WalletIDURN}`
      : `${""}`;
    let topupType = filterValue.Topuptype
      ? `topupType=${filterValue.Topuptype}`
      : `${""}`;
    let originatorType = filterValue.OriginatorType
      ? `originatorType=${filterValue.OriginatorType}`
      : `${""}`;
    let walletType = filterValue.WalletType
      ? `walletType=${filterValue.WalletType}` 
      : `${""}`;
    let remitterId = filterValue.RemitterID
      ? `remitterId=${filterValue.RemitterID}`
      : `${""}`;
    let originatingPersonName = filterValue.OriginatingPersonname
      ? `originatingPersonName=${filterValue.OriginatingPersonname}`
      : `${""}`;
    let statusCode = filterValue.StatusCode
      ? `statusCode=${filterValue.StatusCode}`
      : `${""}`;
    let approverId = filterValue.Approverid
      ? `approverId=${filterValue.Approverid}`
      : `${""}`;
    const params = {
      mobileNumber,
      urn,
      topupType,
      originatorType,
      walletType,
      remitterId,
      originatingPersonName,
      statusCode,
      approverId
    };
    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
       
      }
      let FirstPart=apiURL.split('?')[0]
      let anotherPart=apiURL.split('?')[1].slice(1)
      apiURL=FirstPart+'?'+anotherPart

      return apiURL;
    };

    try {
      const TopUpCommonReports = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (TopUpCommonReports) {
        dispatch({
          type: GET_TOPUP_COMMON_REPORT,
          data: TopUpCommonReports?.data,
        });
      }
    } catch (error) {}
  };
};

export const TopUpCommonReportsDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNumber = filterValue.mobileNumber
    ? `&mobileNumber=${filterValue.mobileNumber}`
    : `${""}`;
  let urn = filterValue.WalletIDURN
    ? `&urn=${filterValue.WalletIDURN}`
    : `${""}`;
  let topupType = filterValue.Topuptype
    ? `&topupType=${filterValue.Topuptype}`
    : `${""}`;
  let originatorType = filterValue.OriginatorType
    ? `&originatorType=${filterValue.OriginatorType}`
    : `${""}`;
  let walletType = filterValue.WalletType
    ? `&walletType=${filterValue.WalletType}` 
    : `${""}`;
  let remitterId = filterValue.RemitterID
    ? `&remitterId=${filterValue.RemitterID}`
    : `${""}`;
  let originatingPersonName = filterValue.OriginatingPersonname
    ? `&originatingPersonName=${filterValue.OriginatingPersonname}`
    : `${""}`;
  let statusCode = filterValue.StatusCode
    ? `&statusCode=${filterValue.StatusCode}`
    : `${""}`;
  let approverId = filterValue.Approverid
    ? `&approverId=${filterValue.Approverid}`
    : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.TopUpCommonReportDownload +
      `?fileType=${fileType}` +
      urn +
      topupType +
      mobileNumber +
      originatorType +
      walletType +
      remitterId +
      originatingPersonName +
      statusCode +
      approverId

    try {
      const TopupCommonDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (TopupCommonDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_TOPUP_COMMON_REPORT_DOWNLOAD_PDF_REPORT,
            data: TopupCommonDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_TOPUP_COMMON_REPORT_DOWNLOAD_EXCEL_REPORT,
            data: TopupCommonDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetTopupCommonReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_COMMON_REPORT });
  };
};

export const resetTopupCommonReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_COMMON_REPORT_PDF_DOWNLOAD });
  };
};

export const resetTopupCommonReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TOPUP_COMMON_REPORT_EXCEL_DOWNLOAD });
  };
};

