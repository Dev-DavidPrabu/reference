import {GET_FAILED_TRANSACTION_DOWNLOAD_EXCEL_REPORT, GET_FAILED_TRANSACTION_DOWNLOAD_PDF_REPORT, GET_FAILED_TRANSACTION_REPORT, RESET_FAILED_TRANSACTION_REPORT, RESET_FAILED_TRANSACTION_REPORT_EXCEL_DOWNLOAD, RESET_FAILED_TRANSACTION_REPORT_PDF_DOWNLOAD} from '../action/FailedTransactionReportAction'

const initialState = {
    getFailedTxnResponseReport : [],
    getFailedTxnDownloadPdfResponseReport : undefined,
    getFailedTxnDownloadExcelResponseReport : undefined,

}

const FailedTransactionReportReducer =(state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_FAILED_TRANSACTION_REPORT:
            return{...state,getFailedTxnResponseReport:action.data}; 
            case GET_FAILED_TRANSACTION_DOWNLOAD_PDF_REPORT:
                return{...state,getFailedTxnDownloadPdfResponseReport:action.data};
                case GET_FAILED_TRANSACTION_DOWNLOAD_EXCEL_REPORT:
                return{...state,getFailedTxnDownloadExcelResponseReport:action.data};
                case RESET_FAILED_TRANSACTION_REPORT:
                    return{...state,getFailedTxnResponseReport:[]}
                    case RESET_FAILED_TRANSACTION_REPORT_PDF_DOWNLOAD:
                        return{...state,getFailedTxnDownloadPdfResponseReport : undefined};
                        case RESET_FAILED_TRANSACTION_REPORT_EXCEL_DOWNLOAD:
                            return{...state,getFailedTxnDownloadExcelResponseReport : undefined};   
            default:
                return state
    }
    
} 

export default FailedTransactionReportReducer