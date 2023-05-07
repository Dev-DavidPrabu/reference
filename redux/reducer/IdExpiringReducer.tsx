import {
  GET_EXPIRING_REPORTS,
  ID_EXPIRING_DOWNLOAD_EXCEL,
  ID_EXPIRING_DOWNLOAD_PDF,
  RESET_EXPIRING_REPORTS,
  RESET_EXPIRING_REPORTS_DOWNLOAD_EXCEL,
  RESET_EXPIRING_REPORTS_DOWNLOAD_PDF,
} from "../action/IdExpiringReportsAction";

const initialState = {
  getIdExpiringResponse: [],
  getIdExpiringPdfDownloadRes: undefined,
  getIdExpiringExcelDownloadRes: undefined,
};

const IdExpiringReportsReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_EXPIRING_REPORTS:
      return { ...state, getIdExpiringResponse: action.data };
    case ID_EXPIRING_DOWNLOAD_EXCEL:
      return { ...state, getIdExpiringExcelDownloadRes: action.data };
    case ID_EXPIRING_DOWNLOAD_PDF:
      return { ...state, getIdExpiringPdfDownloadRes: action.data };
    case RESET_EXPIRING_REPORTS:
      return { ...state, getIdExpiringResponse: [] };
    case RESET_EXPIRING_REPORTS_DOWNLOAD_PDF:
      return { ...state, getIdExpiringPdfDownloadRes: undefined };
    case RESET_EXPIRING_REPORTS_DOWNLOAD_EXCEL:
      return { ...state, getIdExpiringExcelDownloadRes: undefined };

    default:
      return state;
  }
};
export default IdExpiringReportsReducer;
