import { GET_ONBOARDING_SUMMARY_REPORT, ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL, ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF, RESET_ONBOARDING_SUMMARY_REPORT, RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL, RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF } from "../action/OnboardingSummaryReportAction";

const initialState = {
    getOnboardSummaryResponseReport: [],
    getOnboardingSummaryDownloadPdfResponse:undefined,
    getOnboardingSummaryDownloadExcelResponse:undefined

}

const OnboardingSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_ONBOARDING_SUMMARY_REPORT:
            return { ...state, getOnboardSummaryResponseReport: action.data };
        case RESET_ONBOARDING_SUMMARY_REPORT: {
            return { ...state, getOnboardSummaryResponseReport: [] }
        }
        case ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF: {
            return { ...state, getOnboardingSummaryDownloadPdfResponse: action.data }
        }
        case ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getOnboardingSummaryDownloadExcelResponse: action.data }
        }
        case RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_PDF: {
            return { ...state, getOnboardingSummaryDownloadPdfResponse:undefined }
        }
        case RESET_ONBOARDING_SUMMARY_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getOnboardingSummaryDownloadExcelResponse:undefined }
        }
        default:
            return state
    }
}

export default OnboardingSummaryReducer;