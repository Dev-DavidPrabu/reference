import { GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL, GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF, GET_AVG_MONTHLY_TRANSACTION_REPORT, RESET_AVG_MONTHLY_TRANSACTION, RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL, RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF } from "../action/AvgMonthlyTxnReportAction"


const initialState={
    getAvgMonthlyTransactionResponse:[],
    getAvgMonthlyTransactionDownloadPdfResponse:undefined,
    getAvgMonthlyTransactionDownloadExcelResponse:undefined,

}
const AvgMonthlyTransactionReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch (action.type) {
        case GET_AVG_MONTHLY_TRANSACTION_REPORT: {
            return { ...state,  getAvgMonthlyTransactionResponse: action.data }
        }
        case GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF : {
            return { ...state,  getAvgMonthlyTransactionDownloadPdfResponse: action.data }
        }
        case GET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL : {
            return { ...state,  getAvgMonthlyTransactionDownloadExcelResponse: action.data }
        }
        case RESET_AVG_MONTHLY_TRANSACTION: {
            return { ...state,  getAvgMonthlyTransactionResponse: [] }
        }
        case RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_PDF: {
            return { ...state, getAvgMonthlyTransactionDownloadPdfResponse:undefined }
        }
        case RESET_AVG_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL: {
            return { ...state, getAvgMonthlyTransactionDownloadExcelResponse:undefined }
        }
        default:
            return state
    }
}
export default AvgMonthlyTransactionReportReducer;