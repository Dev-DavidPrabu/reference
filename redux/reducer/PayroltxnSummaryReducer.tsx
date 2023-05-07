import { GET_PAYROLL_TXN_SUMMARY_REPORT,RESET_PAYROLL_TXN_SUMMARY_REPORT, GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_PDF, GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_EXCEL, RESET_PAYROLL_TXN_SUMMARY_PDF_DOWNLOAD, RESET_PAYROLL_TXN_SUMMARY_EXCEL_DOWNLOAD } from "../action/PayroltxnSummaryAction"

const initialState={
    getPayrollTxnSummaryResponse:[],
    getPayrollTxnSummaryDownloadPdfResponse:undefined,
    getPayrollTxnSummaryDownloadExcelResponse:undefined,
}
export const PayroltxnSummaryReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_PAYROLL_TXN_SUMMARY_REPORT:{
            return {...state,getPayrollTxnSummaryResponse:action.data}
        }
        case GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_PDF:{
            return {...state,getPayrollTxnSummaryDownloadPdfResponse:action.data}
        }
        case GET_PAYROLL_TXN_SUMMARY_DOWNLOAD_EXCEL:{
            return {...state,getPayrollTxnSummaryDownloadExcelResponse:action.data}
        }
        case RESET_PAYROLL_TXN_SUMMARY_REPORT:{
            return {...state,getPayrollTxnSummaryResponse:[]}
        }
        case RESET_PAYROLL_TXN_SUMMARY_PDF_DOWNLOAD :{
            return {...state,getPayrollTxnSummaryDownloadPdfResponse:undefined}
        }
        case RESET_PAYROLL_TXN_SUMMARY_EXCEL_DOWNLOAD :{
            return {...state,getPayrollTxnSummaryDownloadExcelResponse:undefined}
        }
        default:
            return state
    }
}