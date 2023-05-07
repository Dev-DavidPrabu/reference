import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const WALLET_UPGRADE_APPROVE_REPORT = "WALLET_UPGRADE_APPROVE_REPORT";
export const WALLET_UPGRADE_DOWNLOAD_PDF_REPORT =
  "WALLET_UPGRADE_DOWNLOAD_PDF_REPORT";

export const WALLET_UPGRADE_DOWNLOAD_EXCEL_REPORT =
  "WALLET_UPGRADE_DOWNLOAD_EXCEL_REPORT";
export const RESET_CARD_UPGRADE_REPORTS = "RESET_CARD_UPGRADE_REPORTS";
export const RESET_CARD_UPGRADE_REPORTS_PDF = "RESET_CARD_UPGRADE_REPORTS_PDF";
export const RESET_CARD_UPGRADE_REPORTS_EXCEL =
  "RESET_CARD_BLOCK_REPORTS_EXCEL";

export const getWalletupdateApproveResponse = (data: any) => {
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
    let approvedWalletProduct = data.approvedWalletProduct
      ? `&approvedWalletProduct=${data.approvedWalletProduct}`
      : `${""}`;
    let eligibleWalletProduct = data.eligibleWalletProduct
      ? `&eligibleWalletProduct=${data.eligibleWalletProduct}`
      : `${""}`;
    let existingWalletProductName = data.existingWalletProductName
      ? `&existingWalletProductName=${data.existingWalletProductName}`
      : `${""}`;
      let idNumber = data.idNumber
      ? `&idNumber=${data.idNumber}`
      : `${""}`;
      let sourceCode=data.sourceCode ? `&sourceCode=${data.sourceCode}`
      : `${""}`;


    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.cardUpgradeReports +
      `?status=${data.status}` +
      mobileNo +
      panNumber +
      idDocType +
      requestChannel +
      startDate +
      endDate +
      approvedWalletProduct +
      eligibleWalletProduct +
      existingWalletProductName+
      idNumber+
      sourceCode;

    try {
      const getWalletApproveResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getWalletApproveResponse) {
        dispatch({
          type: WALLET_UPGRADE_APPROVE_REPORT,
          data: getWalletApproveResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const getWalletDownloadPdfResponse = (
  status: any,
  pdf: any,
  data: any
) => {
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
    let approvedWalletProduct = data.approvedWalletProduct
      ? `&approvedWalletProduct=${data.approvedWalletProduct}`
      : `${""}`;
    let eligibleWalletProduct = data.eligibleWalletProduct
      ? `&eligibleWalletProduct=${data.eligibleWalletProduct}`
      : `${""}`;
    let existingWalletProductName = data.existingWalletProductName
      ? `&existingWalletProductName=${data.existingWalletProductName}`
      : `${""}`;
      let idNumber = data.idNumber
      ? `&idNumber=${data.idNumber}`
      : `${""}`;
      let sourceCode=data.sourceCode ? `&sourceCode=${data.sourceCode}`
      : `${""}`;


    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.cardUpgradeDownloadReports +
      `?status=${status}&fileType=${pdf}` +
      mobileNo +
      panNumber +
      idDocType +
      requestChannel +
      startDate +
      endDate +
      approvedWalletProduct +
      eligibleWalletProduct +
      existingWalletProductName+
      idNumber+
      sourceCode;

    try {
      const getWalletPdfDownloadResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getWalletPdfDownloadResponse) {
        if (pdf === "pdf") { 
          dispatch({
            type: WALLET_UPGRADE_DOWNLOAD_PDF_REPORT,
            data: getWalletPdfDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: WALLET_UPGRADE_DOWNLOAD_EXCEL_REPORT,
            data: getWalletPdfDownloadResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetCardUpgradeReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UPGRADE_REPORTS });
  };
};

export const resetCardUpgradeDownloadPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UPGRADE_REPORTS_PDF });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UPGRADE_REPORTS_PDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_UPGRADE_REPORTS_EXCEL });
  };
};
