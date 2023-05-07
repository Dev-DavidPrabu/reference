import {
  GET_MARKETING_REPORT,
  GET_MARKETING_DOWNLOAD_PDF_REPORT,
  GET_MARKETING_DOWNLOAD_EXCEL_REPORT,
  RESET_MARKETING_REPORT,
  RESET_MARKETING_DOWNLOAD_REPORT,
  RESET_MARKETING_DOWNLOAD_PDF_REPORT,
  RESET_MARKETING_DOWNLOAD_EXCEL_REPORT,
} from "../action/MarketingReportAction";

const initialState = {
  getMarketingReportresponse: [],
  getMarketingReportDownloadReportPdfResponse: undefined,
  getMarketingReportDownloadReportExcelResponse: undefined,
};

const MarketingReportReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_MARKETING_REPORT:
      return { ...state, getMarketingReportresponse: action.data };
    case GET_MARKETING_DOWNLOAD_PDF_REPORT:
      return {
        ...state,
        getMarketingReportDownloadReportPdfResponse: action.data,
      };
    case GET_MARKETING_DOWNLOAD_EXCEL_REPORT:
      return {
        ...state,
        getMarketingReportDownloadReportPdfResponse: action.data,
      };
    case RESET_MARKETING_DOWNLOAD_PDF_REPORT:
      return {
        ...state,
        getMarketingReportDownloadReportPdfResponse: undefined,
      };
    case RESET_MARKETING_DOWNLOAD_EXCEL_REPORT:
      return {
        ...state,
        getMarketingReportDownloadReportExcelResponse: undefined,
      };
    case RESET_MARKETING_REPORT:
      return { ...state, getMarketingReportresponse: [] };
    case RESET_MARKETING_DOWNLOAD_REPORT:
      return { ...state, getMarketingReportDownloadReportResponse: [] };
    default:
      return state;
  }
};
export default MarketingReportReducer;
