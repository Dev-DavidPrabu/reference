import { GET_TRANSACTION_HISTORY_REPORT, GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL, GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF, RESET_TRANSACTION_HISTORY_REPORT, RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL, RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF } from "../action/TransactionHistoryReportAction"

const initialState={
getTransactionHistoryReport : [],
getTransactionHistoryDownloadPdfResponse : undefined,
getTransactionHistoryDownloadExcelResponse : undefined,
}
export const TransactionHistoryReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_TRANSACTION_HISTORY_REPORT : {
        return{...state,getTransactionHistoryReport:action.data}
        }
        case GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF :{
            return{...state,getTransactionHistoryDownloadPdfResponse:action.data}
        }
        case GET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL : {
            return{...state,getTransactionHistoryDownloadExcelResponse:action.data}
        }
        case RESET_TRANSACTION_HISTORY_REPORT :{
            return{...state,getTransactionHistoryReport:[]}
        }
        case RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_PDF :{
            return{...state,getTransactionHistoryDownloadPdfResponse:undefined}
        }
        case RESET_TRANSACTION_HISTORY_REPORT_DOWNLOAD_EXCEL :{
            return{...state,getTransactionHistoryDownloadExcelResponse:undefined}
        }
        default:
            return state
    }
}
