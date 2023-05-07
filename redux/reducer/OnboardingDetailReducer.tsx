import { GET_ONBOARDING_DETAIL_REPORT, ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL, ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF, RESET_ONBOARDING_DETAILS_REPORT, RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL, RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF } from "../action/OnboardingDetailReportAction";

const initialState = {
    getOnboardDetailResponseReport: [],
    getOnboardingReportsPdfDownloadResponse:undefined,
    getOnboardingReportsExcelDownloadResponse:undefined,
}

const OnboardingDetailReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_ONBOARDING_DETAIL_REPORT:
            return { ...state, getOnboardDetailResponseReport: action.data };
        case RESET_ONBOARDING_DETAILS_REPORT: {
            return { ...state, getOnboardDetailResponseReport: [] }
        }
        case ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF: {
            return { ...state, getOnboardingReportsPdfDownloadResponse: action.data }
        }
        case ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getOnboardingReportsExcelDownloadResponse: action.data }
        }
        case RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_PDF: {
            return { ...state, getOnboardingReportsPdfDownloadResponse:undefined }
        }
        case RESET_ONBOARDING_DETAILS_REPORT_DOWNLOAD_EXCEL: {
            return { ...state, getOnboardingReportsExcelDownloadResponse:undefined }
        }
        default:
            return state
    }
}

export default OnboardingDetailReducer;