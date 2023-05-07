import { CARDKYC_APPROVE_REPORT, CARDKYC_DOWNLOAD_EXCEL_REPORT, CARDKYC_DOWNLOAD_PDF_REPORT, RESET_KYC_UPDATE_REPORTS, RESET_KYC_UPDATE_REPORTS_EXCEL, RESET_KYC_UPDATE_REPORTS_PDF } from "../action/KYCupdateAction";


const initialState = {
    getKYCResponseReport:[],
    getKYCReportPdfResponse:undefined,
    getKYCReportExcelResponse:undefined,
}

const KYCupdateReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case CARDKYC_APPROVE_REPORT:
        return { ...state, getKYCResponseReport: action.data };
        case RESET_KYC_UPDATE_REPORTS:
          return { ...state, getKYCResponseReport:[] };
      case CARDKYC_DOWNLOAD_PDF_REPORT:
        return { ...state,getKYCReportPdfResponse:action.data}
        case CARDKYC_DOWNLOAD_EXCEL_REPORT:
          return{...state,getKYCReportExcelResponse:action.data}
        case RESET_KYC_UPDATE_REPORTS_PDF:
          return { ...state,getKYCReportPdfResponse:undefined}
          case RESET_KYC_UPDATE_REPORTS_EXCEL:
            return{...state,getKYCReportExcelResponse:undefined}
        default:
            return state;
        }
      };
export default KYCupdateReducer;