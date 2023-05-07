import { GET_TOPUP_RECONCILIATION_REPORT, GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL, GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF, RESET_TOPUP_RECONCILIATION_REPORT, RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL, RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF } from "../action/TopupReconciliationReportAction"

const initialState={
    getTopupReconciliationReportResponse:[],
    getTopupReconciliationDownloadPdfResponse:undefined,
    getTopupReconciliationDownloadExcelResponse:undefined,
}
export const TopupReconciliationReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_TOPUP_RECONCILIATION_REPORT:{
            return {...state,getTopupReconciliationReportResponse:action.data}
        }
        case GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF:{
            return {...state,getTopupReconciliationDownloadPdfResponse:action.data}
        }
        case GET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL:{
            return {...state,getTopupReconciliationDownloadExcelResponse:action.data}
        }
        case RESET_TOPUP_RECONCILIATION_REPORT:{
            return {...state,getTopupReconciliationReportResponse:[]}
        }
        case RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_PDF:{
            return {...state,getTopupReconciliationDownloadPdfResponse:undefined}
        }
        case RESET_TOPUP_RECONCILIATION_REPORT_DOWNLOAD_EXCEL:{
            return {...state,getTopupReconciliationDownloadExcelResponse:undefined}
        }
        default:
            return state
    }
}
