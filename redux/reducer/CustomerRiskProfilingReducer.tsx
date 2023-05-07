import { GET_CUSTOMER_RISK_PROFILING, GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL, GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF, RESET_CUSTOMER_RISK_PROFILING, RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL, RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF } from "../action/CustomerRiskProfilingReportAction"

const initialState = {
    getCustomerRiskProfilingResponse: [],
    getCustomerRiskProfilingPdfDownloadRes: undefined,
    getCustomerRiskProfilingExcelDownloadRes: undefined,

}

const CustomerRiskProfilingReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case GET_CUSTOMER_RISK_PROFILING: {
            return { ...state, getCustomerRiskProfilingResponse: action.data }
        }
        case GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF: {
            return { ...state, getCustomerRiskProfilingPdfDownloadRes: action.data }
        }
        case GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL: {
            return { ...state, getCustomerRiskProfilingExcelDownloadRes: action.data }
        }
        case RESET_CUSTOMER_RISK_PROFILING: {
            return { ...state, getCustomerRiskProfilingResponse: [] }
        }
        case RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF: {
            return { ...state, getCustomerRiskProfilingPdfDownloadRes: undefined }
        }
        case RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL: {
            return { ...state, getCustomerRiskProfilingExcelDownloadRes: undefined}
        }
        default:
            return state
    }
}
export default CustomerRiskProfilingReducer;