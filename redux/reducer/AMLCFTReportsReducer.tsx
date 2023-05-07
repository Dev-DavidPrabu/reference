import { GET_AMLCFT_REPORT, GET_AMLCFT_REPORT_DOWNLAOD, RESET_AMLCFT_REPORT, RESET_AMLCFT_REPORT_DOWNLOAD } from "../action/AMLCFTReportsAction"

const initialState = {
    getAmlcfteportResponse: [],
    getAmlcftReportDownloadResponse: []
}
export const AMLCFTReportsReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case GET_AMLCFT_REPORT: {
            return { ...state, getAmlcftReportResponse: action.data }
        }
        case GET_AMLCFT_REPORT_DOWNLAOD: {
            return { ...state, getAmlcftReportDownloadResponse: action.data }
        }
        case RESET_AMLCFT_REPORT: {
            return { ...state, getAmlcftReportResponse: [] }
        }
        case RESET_AMLCFT_REPORT_DOWNLOAD: {
            return { ...state, getAmlcftReportDownloadResponse: [] }
        }
        default:
            return state
    }
}