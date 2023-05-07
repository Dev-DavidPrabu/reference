import {
  RESET_CARD_UPGRADE_REPORTS,
  RESET_CARD_UPGRADE_REPORTS_PDF,
  WALLET_UPGRADE_APPROVE_REPORT,
  WALLET_UPGRADE_DOWNLOAD_EXCEL_REPORT,
  WALLET_UPGRADE_DOWNLOAD_PDF_REPORT,
  RESET_CARD_UPGRADE_REPORTS_EXCEL,
} from "../action/WalletUpgradeAction";

const initialState = {
  getWalletResponseReport: [],
  downloadWalletPdfResponse: undefined,
  downloadWalletExcelResponse: undefined,
};

const WalletUpgradeReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case WALLET_UPGRADE_APPROVE_REPORT:
      return { ...state, getWalletResponseReport: action.data };
    case RESET_CARD_UPGRADE_REPORTS:
      return { ...state, getWalletResponseReport: [] };
    case WALLET_UPGRADE_DOWNLOAD_PDF_REPORT:
      return { ...state, downloadWalletPdfResponse: action.data };
    case RESET_CARD_UPGRADE_REPORTS_PDF:
      return { ...state, downloadWalletPdfResponse: undefined };
    case RESET_CARD_UPGRADE_REPORTS_EXCEL:
      return { ...state, downloadWalletExcelResponse: undefined };
    case WALLET_UPGRADE_DOWNLOAD_EXCEL_REPORT:
      return { ...state, downloadWalletExcelResponse: action.data };
    default:
      return state;
  }
};
export default WalletUpgradeReducer;
