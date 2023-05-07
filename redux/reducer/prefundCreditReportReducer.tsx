import { GET_PREFUND_CREDIT_REPORT, PREFUND_CREDIT_DOWNLOAD_EXCEL, PREFUND_CREDIT_DOWNLOAD_PDF, RESET_PREFUND_CREDIT_DOWNLOAD_EXCEL, RESET_PREFUND_CREDIT_DOWNLOAD_PDF, RESET__PREFUND_CREDIT_REPORT } from "../action/PrefundCreditReportAction";

const initialState = {
    getPrefundCreditReportresponse : [],
    getPrefundCreditReportPdfResponse:undefined,
    getPrefundCreditReportExcelResponse:undefined,
}

const PrefundCreditReportReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_PREFUND_CREDIT_REPORT:
            return{...state,getPrefundCreditReportresponse:action.data};
            case PREFUND_CREDIT_DOWNLOAD_PDF:
                return{...state,getPrefundCreditReportPdfResponse:action.data};
                case PREFUND_CREDIT_DOWNLOAD_EXCEL:
                    return{...state,getPrefundCreditReportExcelResponse:action.data};
                case RESET__PREFUND_CREDIT_REPORT:
                    return{...state,getPrefundCreditReportresponse:[]}
                    case RESET_PREFUND_CREDIT_DOWNLOAD_PDF:
                        return{...state,getPrefundCreditDownloadReportResponse:undefined}
                        case RESET_PREFUND_CREDIT_DOWNLOAD_EXCEL:
                        return{...state,getPrefundCreditReportExcelResponse:undefined,
                        }
            default:
                return state
    }
} 

export default PrefundCreditReportReducer