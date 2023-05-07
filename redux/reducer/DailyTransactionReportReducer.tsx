import { GET_DAILY_TRANSACTION_REPORTS,RESET_DAILY_TRANSACTION_REPORTS, GET_DAILY_TRANSACTION_DOWNLOAD_PDF_REPORTS, GET_DAILY_TRANSACTION_DOWNLOAD_EXCEL_REPORTS, RESET_DAILY_TRANSACTION_DOWNALOD_PDF, RESET_DAILY_TRANSACTION_DOWNALOD_EXCEL } from "../action/DailyTransactionReportAction";


const initialState = {
    getDailyTransactionResponse: [],
    getDailyTransactionDownloadPdfResponse: undefined,
    getDailyTransactionDownloadExcelResponse: undefined,

};


const DailyTransactionReportReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case GET_DAILY_TRANSACTION_REPORTS: {
            return { ...state, getDailyTransactionResponse: action.data }
        }
        case GET_DAILY_TRANSACTION_DOWNLOAD_PDF_REPORTS: {
            return { ...state, getDailyTransactionDownloadPdfResponse: action.data }
        }
        case GET_DAILY_TRANSACTION_DOWNLOAD_EXCEL_REPORTS: {
            return { ...state, getDailyTransactionDownloadExcelResponse: action.data }
        }
        case RESET_DAILY_TRANSACTION_REPORTS: {
            return { ...state, getDailyTransactionResponse: [] }
        }
        case RESET_DAILY_TRANSACTION_DOWNALOD_PDF: {
            return { ...state, getDailyTransactionDownloadPdfResponse: undefined}
        }
        case RESET_DAILY_TRANSACTION_DOWNALOD_EXCEL: {
            return { ...state, getDailyTransactionDownloadExcelResponse: undefined}
        }
        default:
            return state
    }
}
export default DailyTransactionReportReducer