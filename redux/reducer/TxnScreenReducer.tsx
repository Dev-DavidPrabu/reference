import { GET_TRANSACTION_DOWNLOAD_EXCEL, GET_TRANSACTION_DOWNLOAD_PDF, GET_TRANSACTION_REPORTS, RESET_TRANSACTION_DOWNLOAD_EXCEL, RESET_TRANSACTION_DOWNLOAD_PDF, RESET_TRANSACTION_REPORT } from "../action/TransactionScreenReportAction"

const initialState={
    getTransactionScreenResponse:[],
    getTransactionScreenDownloadPdfResponse:undefined,
    getTransactionScreenDownloadExcelResponse:undefined,

}

const TransactionScreenReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch (action.type) {
        case GET_TRANSACTION_REPORTS: {
            return { ...state,  getTransactionScreenResponse: action.data }
        }
        case GET_TRANSACTION_DOWNLOAD_PDF : {
            return { ...state,  getTransactionScreenDownloadPdfResponse: action.data }
        }
        case GET_TRANSACTION_DOWNLOAD_EXCEL : {
            return { ...state,  getTransactionScreenDownloadExcelResponse: action.data }
        }
        case RESET_TRANSACTION_REPORT: {
            return { ...state,  getTransactionScreenResponse: [] }
        }
        case RESET_TRANSACTION_DOWNLOAD_PDF: {
            return { ...state, getTransactionScreenDownloadPdfResponse:undefined }
        }
        case RESET_TRANSACTION_DOWNLOAD_EXCEL: {
            return { ...state, getTransactionScreenDownloadExcelResponse:undefined }
        }
        default:
            return state
    }
}
export default TransactionScreenReportReducer;