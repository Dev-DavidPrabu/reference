import { GET_MIRS_DECLINED_TRANSACTION_REPORT, RESET_DECLINED_TRANSACTION, GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_PDF, GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_EXCEL, RESET_DECLINED_TRANSACTION_DOWNLOAD_PDF, RESET_DECLINED_TRANSACTION_DOWNLOAD_EXCEL } from "../action/MirsDeclinedTransactionAction"

const initialState = {
    getMirsTransactionReportsResponse: [],
    getMirsTransactionDownloadPdfResponse: undefined,
    getMirsTransactionDownloadExcelResponse: undefined,

}
const MirsDeclinedTransactionReducer = (state = initialState, action: { type: any, data: any }) => {
    switch (action.type) {
        case GET_MIRS_DECLINED_TRANSACTION_REPORT: {
            return { ...state, getMirsTransactionReportsResponse: action.data }
        }
        case GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_PDF: {
            return { ...state, getMirsTransactionDownloadPdfResponse: action.data }
        }
        case GET_MIRS_DECLINED_TRANSACTION_DOWNLOAD_EXCEL: {
            return { ...state, getMirsTransactionDownloadExcelResponse: action.data }
        }
        case RESET_DECLINED_TRANSACTION: {
            return { ...state, getMirsTransactionReportsResponse: [] }
        }
        case RESET_DECLINED_TRANSACTION_DOWNLOAD_PDF: {
            return { ...state, getMirsTransactionDownloadPdfResponse: undefined }
        }
        case RESET_DECLINED_TRANSACTION_DOWNLOAD_EXCEL: {
            return { ...state, getMirsTransactionDownloadExcelResponse: undefined }
        }
        default:
            return state
        
    }
}
export default MirsDeclinedTransactionReducer