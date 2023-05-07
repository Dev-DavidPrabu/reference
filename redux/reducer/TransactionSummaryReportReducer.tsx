import { RESET_FAILED_TRANSACTION_REPORT_DOWNLOAD } from "../action/FailedTransactionReportAction";
import {
  GET_TRANSACTION_SUMMARY_REPORT,
  RESET_TRANSACTION_SUMMARY_REPORT,
  RESET_TRANSACTION_SUMMARY_DOWNLOAD_PDF_REPORT,
  RESET_TRANSACTION_SUMMARY_DOWNLOAD_EXCEL_REPORT,
  GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_PDF,
  GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_EXCEL,
} from "../action/TransactionSummaryReportAction";

const initialState = {
  getTransactionSummaryReport: [],
  getTransactionSummaryDownloadPdfReport: undefined,
  getTransactionSummaryDownloadReportExcel: undefined,
};

const TransactionSummaryReportReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_TRANSACTION_SUMMARY_REPORT:
      return { ...state, getTransactionSummaryReport: action.data };
    case GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_PDF:
      return { ...state, getTransactionSummaryDownloadPdfReport: action.data };
    case GET_TRANSACTION_SUMMARY_DOWNLOAD_REPORT_EXCEL:
      return {
        ...state,
        getTransactionSummaryDownloadReportExcel: action.data,
      };
    case RESET_TRANSACTION_SUMMARY_DOWNLOAD_PDF_REPORT:
      return { ...state, downloadWalletPdfResponse: undefined };
    case RESET_TRANSACTION_SUMMARY_DOWNLOAD_EXCEL_REPORT:
      return { ...state, getTransactionSummaryDownloadReportExcel: undefined };
    case RESET_TRANSACTION_SUMMARY_REPORT:
      return { ...state, getTransactionSummaryReport: [] };
    case RESET_FAILED_TRANSACTION_REPORT_DOWNLOAD:
      return { ...state, getTransactionSummaryDownloadReport: [] };

    default:
      return state;
  }
};
export default TransactionSummaryReportReducer;
