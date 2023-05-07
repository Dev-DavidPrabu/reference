import { RESET_CARD_UNBLOCK_REPORTS, RESET_CARD_UNBLOCK_REPORTS_EXCEL, RESET_CARD_UNBLOCK_REPORTS_PDF, UNBLOCK_APPROVE_REPORT, UNBLOCK_DOWNLOAD_EXCEL_REPORT, UNBLOCK_DOWNLOAD_PDF_REPORT } from "../action/UnblockCardApprovedAction";


const initialState = {
    getUnblockResponseReport:[],
    downloadPdfResponse:undefined,
    downloadExcelResponse:undefined,
}

const UnblockCardApprovedReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case UNBLOCK_APPROVE_REPORT:
        return { ...state, getUnblockResponseReport: action.data };
      case UNBLOCK_DOWNLOAD_PDF_REPORT:
        return { ...state,downloadPdfResponse:action.data}
      case UNBLOCK_DOWNLOAD_EXCEL_REPORT:
        return {...state,downloadExcelResponse:action.data}
        case RESET_CARD_UNBLOCK_REPORTS:
        return {...state,getUnblockResponseReport:[]}
        case RESET_CARD_UNBLOCK_REPORTS_PDF:
          return {...state,downloadPdfResponse:undefined}  
          case RESET_CARD_UNBLOCK_REPORTS_EXCEL:
          return {...state,downloadExcelResponse:undefined} 
        default:
            return state;
        }
      };
export default UnblockCardApprovedReducer;