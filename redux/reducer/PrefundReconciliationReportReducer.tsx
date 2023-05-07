import { GET_RECONCILIATION_REPORT, RECONCILIATION_REPORT_DOWNLOAD_EXCEL, RECONCILIATION_REPORT_DOWNLOAD_PDF, RESET_RECONCILIATION_REPORT, RESET_RECONCILIATION_REPORT_DOWNLOAD_EXCEL, RESET_RECONCILIATION_REPORT_DOWNLOAD_PDF } from "../action/PrefundReconciliationReportsAction";

const initialState = {
    getReconciliationResponseReport: [],
    getReconciliationDownloadPdfResponse:undefined,
    getReconciliationDownloadExcelResponse:undefined,

}

const PrefundReconciliationReportReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_RECONCILIATION_REPORT:
            return { ...state, getReconciliationResponseReport: action.data };
        case RESET_RECONCILIATION_REPORT: {
            return { ...state, getReconciliationResponseReport: [] }
        }
        case RECONCILIATION_REPORT_DOWNLOAD_PDF: {
            return { ...state, getReconciliationDownloadPdfResponse: action.data }
        }
        case RECONCILIATION_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getReconciliationDownloadExcelResponse: action.data }
        }
        case RESET_RECONCILIATION_REPORT_DOWNLOAD_PDF: {
            return { ...state, getReconciliationDownloadPdfResponse:undefined }
        }
        case RESET_RECONCILIATION_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getReconciliationDownloadExcelResponse:undefined }
        }
        default:
            return state
    }
}

export default PrefundReconciliationReportReducer;