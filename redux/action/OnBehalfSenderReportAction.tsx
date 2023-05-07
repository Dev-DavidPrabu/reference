import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const ON_BEHALF_SENDER_REPORT = "ON_BEHALF_SENDER_REPORT";
export const ON_BEHALF_SENDER_DOWNLOAD_PDF_REPORT =
  "ON_BEHALF_SENDER_DOWNLOAD_PDF_REPORT";
export const ON_BEHALF_SENDER_DOWNLOAD_EXCEL_REPORT =
  "ON_BEHALF_SENDER_DOWNLOAD_EXCEL_REPORT";
export const RESET_ONBEHALF_SENDER_REPORT = "RESET_ONBEHALF_SENDER_REPORT";
export const RESET_ONBEHALF_SENDER_REPORT_PDF_DOWNLOAD =
  "RESET_ONBEHALF_SENDER_REPORT_PDF_DOWNLOAD";
export const RESET_ONBEHALF_SENDER_REPORT_EXCEL_DOWNLOAD =
  "RESET_ONBEHALF_SENDER_REPORT_EXCEL_DOWNLOAD";
export const OnBehalfSenderReports = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL = Constants.BaseURL + ApiEndPoints.OnBehalfSenderReport + "?";
    let fromDate = filterValue.startDate
      ? `fromDate=${filterValue.startDate}`
      : `${""}`;

    let toDate = filterValue.endDate
      ? `toDate=${filterValue.endDate}`
      : `${""}`;

    let PaymentMethod = filterValue.PaymentMethod
      ? `paymentMode=${filterValue.PaymentMethod}`
      : `${""}`;

    let idNumber = filterValue.IdNumber
      ? `idNumber=${filterValue.IdNumber}`
      : `${""}`;

    let mobileNumber = filterValue.mobileNumber
      ? `mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;

    let transactionStatus = filterValue.TransactionStatus
      ? `transactionStatus=${filterValue.TransactionStatus}`
      : `${""}`;

    const params = {
      fromDate,
      toDate,

      PaymentMethod,
      idNumber,
      mobileNumber,
      transactionStatus,
    };

    const constructUrl = (params: any) => {
      let paramsKeys = Object.values(params);

      for (let paramKey of paramsKeys) {
        apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
      }

      return apiURL;
    };

    try {
      const getOnbehalfSenderReport = await axios
        .get(constructUrl(params))
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });

      if (getOnbehalfSenderReport) {
        dispatch({
          type: ON_BEHALF_SENDER_REPORT,
          data: getOnbehalfSenderReport.data,
        });
      }
    } catch (error) {}
  };
};

export const OnBehalfSenderReportDownload = (
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

    let paymentMode = filterValue.PaymentMethod
      ? `&paymentMode=${filterValue.PaymentMethod}`
      : `${""}`;

    let idNumber = filterValue.IdNumber
      ? `&idNumber=${filterValue.IdNumber}`
      : `${""}`;

    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;

    let transactionStatus = filterValue.TransactionStatus
      ? `&transactionStatus=${filterValue.TransactionStatus}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.OnBehalfSenderDownloadReports +
      `?fileType=${fileType}` +
      fromDate +
      toDate +
      paymentMode +
      idNumber +
      mobileNumber +
      transactionStatus;

    try {
      const OnbehalfSenderReportResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (OnbehalfSenderReportResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: ON_BEHALF_SENDER_DOWNLOAD_PDF_REPORT,
            data: OnbehalfSenderReportResponse?.data,
          });
        } else {
          dispatch({
            type: ON_BEHALF_SENDER_DOWNLOAD_EXCEL_REPORT,
            data: OnbehalfSenderReportResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetOnbehalfSenderReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBEHALF_SENDER_REPORT });
  };
};

export const resetOnbehalfSenderReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBEHALF_SENDER_REPORT_PDF_DOWNLOAD });
  };
};

export const resetOnbehalfSenderReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ONBEHALF_SENDER_REPORT_EXCEL_DOWNLOAD });
  };
};
