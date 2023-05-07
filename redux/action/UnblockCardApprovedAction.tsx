import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const UNBLOCK_APPROVE_REPORT = "UNBLOCK_APPROVE_REPORT";
export const UNBLOCK_DOWNLOAD_PDF_REPORT = "UNBLOCK_DOWNLOAD_PDF_REPORT";
export const UNBLOCK_DOWNLOAD_EXCEL_REPORT = "UNBLOCK_DOWNLOAD_EXCEL_REPORT";
export const RESET_CARD_UNBLOCK_REPORTS = "RESET_CARD_UNBLOCK_REPORTS";
export const RESET_CARD_UNBLOCK_REPORTS_PDF = "RESET_CARD_UNBLOCK_REPORTS_PDF";
export const RESET_CARD_UNBLOCK_REPORTS_EXCEL =
  "RESET_CARD_UNBLOCK_REPORTS_EXCEL";

export const getUnblockApproveResponse = (data: any) => {
  return async (dispatch: Dispatch) => {
    let cardlastfourdigit = data.cardlastfourdigit
      ? `&cardlastfourdigit=${data.cardlastfourdigit}`
      : `${""}`;
    let mobileNo = data.mobileNumber
      ? `&mobileNumber=${data.mobileNumber}`
      : `${""}`;
    let cardUrn = data.cardUrn ? `&cardUrn=${data.cardUrn}` : `${""}`;
    let inputOperatorName = data.inputOperatorName
      ? `&inputOperatorName=${data.inputOperatorName}`
      : `${""}`;
    let approverName = data.approverName
      ? `&approverName=${data.approverName}`
      : `${""}`;
    let requestChannel = data.requestChannel
      ? `&requestChannel=${data.requestChannel}`
      : `${""}`;
    let startDate = data.startDate ? `&fromDate=${data.startDate}` : `${""}`;
    let endDate = data.endDate ? `&toDate=${data.endDate}` : `${""}`;
    let sourceCode = data.sourceCode ? `&sourceCode=${data.sourceCode}` : `${""}`;
    let idNumber = data.idNumber ? `&idNumber=${data.idNumber}` : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getUnblockApprovalReport +
      `?status=${data.status}` +
      mobileNo +
      cardUrn +
      inputOperatorName +
      approverName +
      requestChannel +
      startDate +
      endDate +
      cardlastfourdigit+
      sourceCode+
      idNumber
    try {
      const getApproveResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getApproveResponse) {
        dispatch({
          type: UNBLOCK_APPROVE_REPORT,
          data: getApproveResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const getDownloadPdfResponse = (data: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let cardlastfourdigit = data.cardlastfourdigit
      ? `&cardlastfourdigit=${data.cardlastfourdigit}`
      : `${""}`;
    let mobileNo = data.mobileNumber
      ? `&mobileNumber=${data.mobileNumber}`
      : `${""}`;
    let cardUrn = data.cardUrn ? `&cardUrn=${data.cardUrn}` : `${""}`;
    let inputOperatorName = data.inputOperatorName
      ? `&inputOperatorName=${data.inputOperatorName}`
      : `${""}`;
    let approverName = data.approverName
      ? `&approverName=${data.approverName}`
      : `${""}`;
    let requestChannel = data.requestChannel
      ? `&requestChannel=${data.requestChannel}`
      : `${""}`;
    let startDate = data.startDate ? `&fromDate=${data.startDate}` : `${""}`;
    let endDate = data.endDate ? `&toDate=${data.endDate}` : `${""}`;
    let sourceCode = data.sourceCode ? `&sourceCode=${data.sourceCode}` : `${""}`;
    let idNumber = data.idNumber ? `&idNumber=${data.idNumber}` : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.downloadUnblockReport +
      `?status=${data.status}&fileType=${fileType}` +
      mobileNo +
      cardUrn +
      inputOperatorName +
      approverName +
      requestChannel +
      startDate +
      endDate +
      cardlastfourdigit+
      sourceCode+
      idNumber

    try {
      const getPdfDownloadResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getPdfDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: UNBLOCK_DOWNLOAD_PDF_REPORT,
            data: getPdfDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: UNBLOCK_DOWNLOAD_EXCEL_REPORT,
            data: getPdfDownloadResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetCardUnBlockReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UNBLOCK_REPORTS });
  };
};

export const resetCardUnBlockDoenloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UNBLOCK_REPORTS_PDF });
  };
};
export const resetCardUnBlockDoenloadExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UNBLOCK_REPORTS_EXCEL });
  };
};
