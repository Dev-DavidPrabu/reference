import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const CARDKYC_APPROVE_REPORT = "CARDKYC_APPROVE_REPORT";
export const CARDKYC_DOWNLOAD_PDF_REPORT = "CARDKYC_DOWNLOAD_PDF_REPORT";
export const CARDKYC_DOWNLOAD_EXCEL_REPORT = "CARDKYC_DOWNLOAD_EXCEL_REPORT";
export const RESET_KYC_UPDATE_REPORTS = "RESET_KYC_UPDATE_REPORTS";
export const RESET_KYC_UPDATE_REPORTS_PDF = "RESET_KYC_UPDATE_REPORTS_PDF";
export const RESET_KYC_UPDATE_REPORTS_EXCEL = "RESET_KYC_UPDATE_REPORTS_EXCEL";

export const getKYCupdateApproveResponse = (data: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = data.mobileNumber
      ? `&mobileNumber=${data.mobileNumber}`
      : `${""}`;
    let panNumber = data.panNumber
      ? `&cardlastfourdigit=${data.panNumber}`
      : `${""}`;
    let idDocType = data.idDocType ? `&idDocType=${data.idDocType}` : `${""}`;
    let requestChannel = data.requestChannel
      ? `&requestChannel=${data.requestChannel}`
      : `${""}`;
    let startDate = data.startDate ? `&fromDate=${data.startDate}` : `${""}`;
    let endDate = data.endDate ? `&toDate=${data.endDate}` : `${""}`;
    let sourceCode=data.sourceCode?`&sourceCode=${data.sourceCode}` : `${""}`;
    let idNumber=data.idNumber?`&idNumber=${data.idNumber}` : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.kycUpdateReports +
      `?status=${data.status}` +
      mobileNo +
      panNumber +
      idDocType +
      requestChannel +
      startDate +
      endDate+
      sourceCode+
      idNumber;

    try {
      const getKYCApproveResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getKYCApproveResponse) {
        dispatch({
          type: CARDKYC_APPROVE_REPORT,
          data: getKYCApproveResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const getKYCDownloadPdfResponse = (data: any, fileType: any) => {
  
  return async (dispatch: Dispatch) => {
    let mobileNo = data.mobileNumber
      ? `&mobileNumber=${data.mobileNumber}`
      : `${""}`;
    let panNumber = data.panNumber
      ? `&cardlastfourdigit=${data.panNumber}`
      : `${""}`;
    let idDocType = data.idDocType ? `&idDocType=${data.idDocType}` : `${""}`;
    let requestChannel = data.requestChannel
      ? `&requestChannel=${data.requestChannel}`
      : `${""}`;
    let startDate = data.startDate ? `&fromDate=${data.startDate}` : `${""}`;
    let endDate = data.endDate ? `&toDate=${data.endDate}` : `${""}`;
    let sourceCode=data.sourceCode?`&sourceCode=${data.sourceCode}` : `${""}`;
    let idNumber=data.idNumber?`&idNumber=${data.idNumber}` : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.kycUpdateDownloadReport +
      `?status=${data.status}&fileType=${fileType}` +
      mobileNo +
      panNumber +
      idDocType +
      requestChannel +
      startDate +
      endDate +
      sourceCode+
      idNumber;

    try {
      const getKYCPdfDownloadResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getKYCPdfDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: CARDKYC_DOWNLOAD_PDF_REPORT,
            data: getKYCPdfDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: CARDKYC_DOWNLOAD_EXCEL_REPORT,
            data: getKYCPdfDownloadResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetKycUpdateReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_UPDATE_REPORTS });
  };
};

export const resetKycUpdateDowmloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_UPDATE_REPORTS_PDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_UPDATE_REPORTS_EXCEL });
  };
};
