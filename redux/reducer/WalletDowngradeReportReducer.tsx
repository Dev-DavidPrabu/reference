import {
  GET_WALLETDOWNGRADE_REPORT,
  GET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD,
  GET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD,
  RESET_WALLETDOWNGRADE_REPORT,
  RESET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD,
  RESET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD,
} from "../action/WalletDowngradeReportAction";

const initialState = {
  getWalletDowngradeReport: [],
  getWalletDowngradeReportPdfResponse: undefined,
  getWalletDowngradeReportExcelResponse: undefined,
};

const WalletDowngradeReportReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_WALLETDOWNGRADE_REPORT:
      return { ...state, getWalletDowngradeReport: action.data };
    case GET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD:
      return { ...state, getWalletDowngradeReportPdfResponse: action.data };
    case GET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD:
      return { ...state, getWalletDowngradeReportExcelResponse: action.data };
    case RESET_WALLETDOWNGRADE_REPORT:
      return { ...state, getWalletDowngradeReport: [] };
    case RESET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD:
      return { ...state, getWalletDowngradeReportPdfResponse: undefined };
    case RESET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD:
      return { ...state, getWalletDowngradeReportExcelResponse: undefined };
    default:
      return state;
  }
};
export default WalletDowngradeReportReducer;
