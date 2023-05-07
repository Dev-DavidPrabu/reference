import { REFUND_TXN_DOWNLOAD_EXCEL_REPORT, REFUND_TXN_DOWNLOAD_PDF_REPORT, REFUND_TXN_REPORT, RESET_REFUND_TXN_EXCEL_DOWNLOAD_REPORT, RESET_REFUND_TXN_PDF_DOWNLOAD_REPORT, RESET_REFUND_TXN_REPORT } from "../action/RefundTxnReportAction";

const initialState = {
    getRefundTxnResponseReport: [],
    getRefundTxnPdfDownloadResponseReport: undefined,
    getRefundTxnExcelDownloadResponseReport: undefined,

}

const RefundTxnReportReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case REFUND_TXN_REPORT:
            return { ...state, getRefundTxnResponseReport: action.data };
        case REFUND_TXN_DOWNLOAD_PDF_REPORT:
            return { ...state, getRefundTxnPdfDownloadResponseReport: action.data };
        case REFUND_TXN_DOWNLOAD_EXCEL_REPORT:
            return { ...state, getRefundTxnExcelDownloadResponseReport: action.data };
        case RESET_REFUND_TXN_REPORT:
            return { ...state, getRefundTxnResponseReport: [] }
        case RESET_REFUND_TXN_PDF_DOWNLOAD_REPORT:
            return { ...state, getRefundTxnDownloadResponseReport: undefined }
        case RESET_REFUND_TXN_EXCEL_DOWNLOAD_REPORT:
            return { ...state, getRefundTxnExcelDownloadResponseReport: undefined }
        default:
            return state
    }
}

export default RefundTxnReportReducer