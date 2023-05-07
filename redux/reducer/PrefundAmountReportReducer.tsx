import { GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL, GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF, GET_PREFUND_AMOUNT_REPORT, RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL, RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF, RESET__PREFUND_AMOUNT_REPORT } from "../action/PrefundAmountReportAction";

const initialState ={
    getPrefundAmountReportresponse : [],
    getPrefundAmountDownloadReportPdfResponse : undefined,
    getPrefundAmountDownloadReportExcelResponse : undefined,
}

const PrefundAmountReportReducer = (state=initialState,action:{type: string; data: any }) =>{
    switch (action.type){
        case GET_PREFUND_AMOUNT_REPORT:
            return{...state,getPrefundAmountReportresponse:action.data};
            case GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF:
                return{...state,getPrefundAmountDownloadReportPdfResponse:action.data};
                case GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL:
                    return{...state,getPrefundAmountDownloadReportExcelResponse:action.data};
                case RESET__PREFUND_AMOUNT_REPORT:
                    return{...state,getPrefundAmountReportresponse:[]}
                    case RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF:
                        return{...state,getPrefundAmountDownloadReportPdfResponse:undefined}
                        case RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL:
                        return{...state,getPrefundAmountDownloadReportExcelResponse:undefined}
            default:
                return state
    }
}
export default PrefundAmountReportReducer