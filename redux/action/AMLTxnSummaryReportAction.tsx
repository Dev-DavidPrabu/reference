import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const AML_TXN_SUMMARY_REPORT = "AML_TXN_SUMMARY_REPORT";
export const AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT =
  "AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT";
  export const AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT =
  "AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT";
export const RESET_AML_TXN_SUMMARY_REPORT = "RESET_AML_TXN_SUMMARY_REPORT";
export const RESET_AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT =
  "RESET_AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT";
export const RESET_AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT =
  "RESET_AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT";

export const getAmlTxnSummaryReport = (filterValue: any) => {
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
    let paymentMode = filterValue.PaymentMode
      ? `&paymentMode=${filterValue.PaymentMode}`
      : `${""}`;
    let approver = filterValue.Approver
      ? `&approver=${filterValue.Approver}`
      : `${""}`;
    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.AMLTxnSummaryReport +
      `?${fromDate}${toDate}` +
      mobileNumber +
      country +
      paymentMode +
      approver;
    try {
      const TXNSummaryReportResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (TXNSummaryReportResponse) {
        dispatch({
          type: AML_TXN_SUMMARY_REPORT,
          data: TXNSummaryReportResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const AMLTransactionSummaryDownloadReport = (
  filterValue: any,
  fileType: any
) => {
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
    let paymentMode = filterValue.PaymentMode
      ? `&paymentMode=${filterValue.PaymentMode}`
      : `${""}`;
    let approver = filterValue.Approver
      ? `&approver=${filterValue.Approver}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.AMLTxnSummaryDownloadReport +
      `?fileType=${fileType}${fromDate}${toDate}` +
      mobileNumber +
      country +
      paymentMode +
      approver;
    try {
      const AMLTxnSummaryDownloadRes = await axios
        .get(apiURL,)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (AMLTxnSummaryDownloadRes) {
        if (fileType === "pdf") {
        dispatch({
          type: AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT,
          data: AMLTxnSummaryDownloadRes?.data,
        });
      }else {
        dispatch({
          type: AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT,
          data: AMLTxnSummaryDownloadRes?.data,
        });
      }
    }
  } catch (error) {}
};
};

export const resetTxnSummaryReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AML_TXN_SUMMARY_REPORT });
  };
};

export const resetTxnSummaryReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT });
  };
};

export const resetTxnSummaryReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT });
  };
};
