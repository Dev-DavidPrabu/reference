import { AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT, AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT, AML_TXN_SUMMARY_REPORT, RESET_AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT, RESET_AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT, RESET_AML_TXN_SUMMARY_REPORT } from "../action/AMLTxnSummaryReportAction"

const initialState ={
    getAMLTxnSummaryReport :[],
    getAMLTxnSummaryDownloadPdfResponseReport : undefined,
    getAMLTxnSummaryDownloadExcelResponseReport : undefined,
}

export const AMLTxnSummaryReportReducer =(state=initialState,action:{type:string,data:any})=>{
    
    switch(action.type){
        case AML_TXN_SUMMARY_REPORT :{
            return {...state,getAMLTxnSummaryReport:action.data}
        }
        case AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT:{
            return{...state,getAMLTxnSummaryDownloadPdfResponseReport:action.data}
        }
        case AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT:{
            return{...state,getAMLTxnSummaryDownloadExcelResponseReport:action.data}
 
        }
        case RESET_AML_TXN_SUMMARY_REPORT:{
            return{...state,getAMLTxnSummaryReport:[]}
        }
        case RESET_AML_TXN_SUMMARY_PDF_DOWNLOAD_REPORT:{
            return{...state,getAMLTxnSummaryDownloadPdfResponseReport:undefined}
        }
        case RESET_AML_TXN_SUMMARY_EXCEL_DOWNLOAD_REPORT:{
            return{...state,getAMLTxnSummaryDownloadExcelResponseReport:undefined}
        }
        default:
            return state
    }
}