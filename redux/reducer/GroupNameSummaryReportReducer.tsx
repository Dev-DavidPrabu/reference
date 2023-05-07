import { GET_GROUPNAME_SUMMARY_REPORT,
    GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD,
    GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD,
RESET_GROUPNAME_SUMMARY_REPORT, RESET_GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD, RESET_GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD } from "../action/GroupNameSummaryReportAction";

const initialState = {
    getGroupNameSummaryResponseReport: [],
    getGroupNameSummaryPdfDownloadResponse:undefined,
    getGroupNameSummaryExcelDownloadResponse:undefined,

}

const GroupNameSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_GROUPNAME_SUMMARY_REPORT:
            return { ...state, getGroupNameSummaryResponseReport: action.data };
        case RESET_GROUPNAME_SUMMARY_REPORT: {
            return { ...state, getGroupNameSummaryResponseReport: [] }
        }
        case GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD: {
            return { ...state, getGroupNameSummaryPdfDownloadResponse: action.data }
        }
        case GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD: {
            return { ...state, getGroupNameSummaryExcelDownloadResponse: action.data }
        }
        case RESET_GROUPNAME_SUMMARY_REPORT_PDF_DOWNLOAD: {
            return { ...state, getGroupNameSummaryPdfDownloadResponse: undefined }
        }
        case RESET_GROUPNAME_SUMMARY_REPORT_EXCEL_DOWNLOAD: {
            return { ...state, getGroupNameSummaryExcelDownloadResponse: undefined }
        }
        default:
            return state
    }
}

export default GroupNameSummaryReducer;