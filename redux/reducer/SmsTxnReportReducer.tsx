import { RESET_SMS_TRANSACTION_REPORT, RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL, RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_PDF, SMS_TRANSACTION_REPORT, SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL, SMS_TRANSACTION_REPORT_DOWNLOAD_PDF } from "../action/SmsTransactionReportAction";

const initialState = {
    getSmsTxnResponsereport : [],
    getSmsTxndownloadPdfResponse : undefined,
    getSmsTxndownloadExcelResponse : undefined
}
const SmsTxnReportReducer =(state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case SMS_TRANSACTION_REPORT:
            return{...state,getSmsTxnResponsereport:action.data};
            case SMS_TRANSACTION_REPORT_DOWNLOAD_PDF:
                return{...state,getSmsTxndownloadPdfResponse:action.data}
             case SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL:
                    return{...state,getSmsTxndownloadExcelResponse:action.data}
            case RESET_SMS_TRANSACTION_REPORT:
                return{...state,getSmsTxnResponsereport:[]}
            case RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_PDF:
                return{...state,getSmsTxndownloadPdfResponse : undefined}
                case RESET_SMS_TRANSACTION_REPORT_DOWNLOAD_EXCEL:
                    return{...state,getSmsTxndownloadExcelResponse : undefined}
            default:
                return state
    }
     
}

export default SmsTxnReportReducer