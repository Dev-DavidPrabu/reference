import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_TRANSACTION_HISTORY_REPORT = "GET_TRANSACTION_HISTORY_REPORT";
export const GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF = "GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF";
export const GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL = "GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL";
export const RESET_TRANSACTION_HISTORY_REPORT = "RESET_TRANSACTION_HISTORY_REPORT";
export const RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF = "RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF";
export const RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL = "RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL";

export const getTransactionHistoryReport = (filterValue: any) => {
    return async (dispatch: Dispatch) => {
      let fromDate = filterValue.fromDate 
        ? `&fromDate=${filterValue.fromDate}`
        : `${""}`;
      let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
      let companyName = filterValue.companyName
        ? `&companyName=${filterValue.companyName}`
        : `${""}`;
      const apiURL =
        Constants.BaseURL +ApiEndPoints.TransactionHistoryReport+`?${fromDate}${toDate}${companyName}`;
        try {
            const TxnHistoryReportResponse = await axios
              .get(apiURL)
              .then((response: any) => {
                if (response) {
                  return response.data;
                } else {
                  return false;
                }
              });
            if (TxnHistoryReportResponse) {
              dispatch({
                type: GET_TRANSACTION_HISTORY_REPORT,
                data: TxnHistoryReportResponse,
              });
            }
          } catch (err) {}
        };
      };

      export const getTxnHistoryReportDownlaod = (filterValue: any, fileType: any) => {
        return async (dispatch: Dispatch) => {
          let fromDate = filterValue.fromDate
            ? `&fromDate=${filterValue.fromDate}`
            : `${""}`;
          let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
          let companyName = filterValue.companyName
            ? `&companyName=${filterValue.companyName}`
            : `${""}`;
          const apiURL =
            Constants.BaseURL +
            ApiEndPoints.TransactionHistoryReportDownload + 
            `?fileType=${fileType}${fromDate}${toDate}${companyName}`;
          try {
            const TxnHistoryReportResponse = await axios
              .get(apiURL)
              .then((response: any) => {
                if (response) {
                  return response;
                } else {
                  return false;
                }
              });
            if (TxnHistoryReportResponse) {
              if (fileType === "pdf") {
                dispatch({
                  type: GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF,
                  data: TxnHistoryReportResponse?.data,
                });
              } else {
                dispatch({
                  type: GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL,
                  data: TxnHistoryReportResponse?.data,
                });
              }
            }
          } catch (err) {}
        };
      };

      export const ResetTxnHistoryReport = () => {
        return async (dispatch: Dispatch) => {
          dispatch({ type: RESET_TRANSACTION_HISTORY_REPORT });
        };
      };
      export const ResetTxnHistoryDownloadPdf = () => {
        return async (dispatch: Dispatch) => {
          dispatch({ type: RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF });
        };
      };
      
      export const ResetTxnHistoryDownloadExcel = () => {
        return async (dispatch: Dispatch) => {
          dispatch({ type: RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL });
        };
      };