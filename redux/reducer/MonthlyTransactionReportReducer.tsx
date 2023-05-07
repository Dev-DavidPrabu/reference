import { GET_MONTHLY_TRANSACTION_REPORTS,RESET_MONTHLY_TRANSACTION, GET_MONTHLY_TRANSACTION_DOWNLOAD_PDF, GET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL, RESET_MONTHLY_TRANSACTION_DOWNLOAD_PDF, RESET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL } from "../action/MonthlyTransactionReportAction"


const initialState={
    getMonthlyTransactionResponse:[],
    getMonthlyTransactionDownloadPdfResponse:undefined,
    getMonthlyTransactionDownloadExcelResponse:undefined,

}
const MonthlyTransactionReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch (action.type) {
        case GET_MONTHLY_TRANSACTION_REPORTS: {
            return { ...state,  getMonthlyTransactionResponse: action.data }
        }
        case GET_MONTHLY_TRANSACTION_DOWNLOAD_PDF : {
            return { ...state,  getMonthlyTransactionDownloadPdfResponse: action.data }
        }
        case GET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL : {
            return { ...state,  getMonthlyTransactionDownloadExcelResponse: action.data }
        }
        case RESET_MONTHLY_TRANSACTION: {
            return { ...state,  getMonthlyTransactionResponse: [] }
        }
        case RESET_MONTHLY_TRANSACTION_DOWNLOAD_PDF: {
            return { ...state, getMonthlyTransactionDownloadPdfResponse:undefined }
        }
        case RESET_MONTHLY_TRANSACTION_DOWNLOAD_EXCEL: {
            return { ...state, getMonthlyTransactionDownloadExcelResponse:undefined }
        }
        default:
            return state
    }
}
export default MonthlyTransactionReportReducer;