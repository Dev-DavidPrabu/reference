import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_CARDBLOCK_REPORTS = "GET_CARDBLOCK_REPORTS";
export const CARD_BLOCK_DOWNLOAD_PDF = "CARD_BLOCK_DOWNLOAD_PDF";
export const CARD_BLOCK_DOWNLOAD_EXCEL = "CARD_BLOCK_DOWNLOAD_EXCEL";
export const RESET_CARD_BLOCK_REPORTS = "RESET_CARD_BLOCK_REPORTS";
export const RESET_CARD_BLOCK_REPORTS_PDF = "RESET_CARD_BLOCK_REPORTS_PDF";
export const RESET_CARD_BLOCK_REPORTS_EXCEL = "RESET_CARD_BLOCK_REPORTS_EXCEL";

export const getCardBlockReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let cardurn = filterValue.cardurn
      ? `&cardUrn=${filterValue.cardurn}`
      : `${""}`;
    let requestReason = filterValue.requestReason
      ? `&reasonCode=${filterValue.requestReason}`
      : `${""}`;
    let requestChannel = filterValue.requestChannel
      ? `&requestChannel=${filterValue.requestChannel}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let cardlastfourdigit = filterValue.cardlastfourdigit
      ? `&cardlastfourdigit=${filterValue.cardlastfourdigit}`
      : `${""}`;
    let sourceCode = filterValue.sourceCode
      ? `&sourceCode=${filterValue.sourceCode}`
      : `${""}`;
      let idNumber = filterValue.idNumber
      ? `&idNumber=${filterValue.idNumber}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getCardBlockReports +
      `?status=${filterValue.status}` +
      mobileNo +
      cardurn +
      requestReason +
      requestChannel +
      startDate +
      endDate +
      cardlastfourdigit+
      sourceCode+
      idNumber;

    try {
      const cardBlockReportsList = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (cardBlockReportsList) {
        dispatch({
          type: GET_CARDBLOCK_REPORTS,
          data: cardBlockReportsList.data,
        });
      }
    } catch (error) {}
  };
};

export const CardBlockDownloadReports = (data: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = data.mobileNumber
      ? `&mobileNumber=${data.mobileNumber}`
      : `${""}`;
    let cardurn = data.cardurn ? `&cardUrn=${data.cardurn}` : `${""}`;
    let requestReason = data.requestReason
      ? `&reasonCode=${data.requestReason}`
      : `${""}`;
    let requestChannel = data.requestChannel
      ? `&requestChannel=${data.requestChannel}`
      : `${""}`;
    let startDate = data.startDate ? `&fromDate=${data.startDate}` : `${""}`;
    let endDate = data.endDate ? `&toDate=${data.endDate}` : `${""}`;
    let cardlastfourdigit = data.cardlastfourdigit
      ? `&cardlastfourdigit=${data.cardlastfourdigit}`
      : `${""}`;
      let sourceCode = data.sourceCode
      ? `&sourceCode=${data.sourceCode}`
      : `${""}`;
      let idNumber = data.idNumber
      ? `&idNumber=${data.idNumber}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.cardBlockDownloadPdf +
      `?status=${data.status}&fileType=${fileType}` +
      mobileNo +
      cardurn +
      requestReason +
      requestChannel +
      startDate +
      endDate +
      cardlastfourdigit+
      sourceCode+
      idNumber;

    try {
      const cardBlockDownloadPdfRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (cardBlockDownloadPdfRes) {
        if (fileType === "pdf") {
          dispatch({
            type: CARD_BLOCK_DOWNLOAD_PDF,
            data: cardBlockDownloadPdfRes?.data,
          });
        } else {
          dispatch({
            type: CARD_BLOCK_DOWNLOAD_EXCEL,
            data: cardBlockDownloadPdfRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetCardBlockReports = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_BLOCK_REPORTS });
  };
};

export const resetPDFRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_BLOCK_REPORTS_PDF });
  };
};
export const resetExcelRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_BLOCK_REPORTS_EXCEL });
  };
};
