import { GET_BRANCH_MANAGEMENT_REPORT,RESET_BRANCH_MANAGEMENT_REPORT, GET_BRANCH_REPORT_DOWNLOAD_PDF, GET_BRANCH_REPORT_DOWNLOAD_EXCEL, RESET_BRANCH_MANAGEMENT_DOWNLOAD_PDF, RESET_BRANCH_MANAGEMENT_DOWNLOAD_EXCEL } from "../action/BranchManagementReportAction"

const initialState = {
    getBranchManagementResponse: [],
    getBranchDownloadReportPdf:undefined,
    getBranchDownloadReportExcel:undefined,

}
const BranchManagementReportReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case GET_BRANCH_MANAGEMENT_REPORT: {
            return { ...state, getBranchManagementResponse: action.data }
        }
        case GET_BRANCH_REPORT_DOWNLOAD_PDF:{
            return {...state,getBranchDownloadReportPdf:action.data}
        }
        case GET_BRANCH_REPORT_DOWNLOAD_EXCEL:{
            return {...state,getBranchDownloadReportExcel:action.data}
        }
        case RESET_BRANCH_MANAGEMENT_REPORT:{
            return {...state,getBranchManagementResponse:[]}
        }
        case RESET_BRANCH_MANAGEMENT_DOWNLOAD_PDF:{
            return {...state,getBranchDownloadReportPdf:undefined}
        }
        case RESET_BRANCH_MANAGEMENT_DOWNLOAD_EXCEL:{
            return {...state,getBranchDownloadReportExcel:undefined}
        }
        default:
            return state
    }
}

export default BranchManagementReportReducer