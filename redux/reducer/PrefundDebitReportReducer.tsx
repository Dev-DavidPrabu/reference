import {  GET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL, GET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF, GET_PREFUND_DEBIT_REPORT, RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL, RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF, RESET__PREFUND_DEBIT_REPORT } from "../action/PrefundDebitReportAction";

const initialState = {
    getPrefundDebitReportresponse : [],
    getPrefundDebitDownloadReportPdfResponse : undefined,
    getPrefundDebitdownloadReportExcelResponse : undefined,
}

const PrefundDebitReportReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_PREFUND_DEBIT_REPORT:
            return{...state,getPrefundDebitReportresponse:action.data};
            case GET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF:
                return{...state,getPrefundDebitDownloadReportPdfResponse:action.data};
                case GET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL:
                    return{...state,getPrefundDebitdownloadReportExcelResponse:action.data};
                case RESET__PREFUND_DEBIT_REPORT:
                    return{...state,getPrefundDebitReportresponse:[]}
                    case RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF:
                        return{...state,getPrefundDebitDownloadReportPdfResponse : undefined}
                        case RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL:
                            return{...state, getPrefundDebitdownloadReportExcelResponse : undefined}
            default:
                return state
    }
}

export default PrefundDebitReportReducer