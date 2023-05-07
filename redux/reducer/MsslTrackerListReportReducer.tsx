import { GET_MSSLTRACKER_LIST_REPORT, GET_MSSLTRACKER_LIST_DOWNLOAD, RESET_MSSLTRACKER_LIST_REPORT, RESET_MSSLTRACKER_LIST_DOWNLOAD } from "../action/MsslTrackerListReportAction"

const initialState = {
    getMsslReportResponse: [],
    getMsslReportDownloadResponse: []
}
export const MsslTrackerListReportReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case GET_MSSLTRACKER_LIST_REPORT: {
            return { ...state, getMsslReportResponse: action.data }
        }
        case GET_MSSLTRACKER_LIST_DOWNLOAD: {
            return { ...state, getMsslReportDownloadResponse: action.data }
        }
        case RESET_MSSLTRACKER_LIST_REPORT: {
            return { ...state, getMsslReportResponse: [] }
        }
        case RESET_MSSLTRACKER_LIST_DOWNLOAD: {
            return { ...state, getMsslReportDownloadResponse: [] }
        }
        default:
            return state
    }
}