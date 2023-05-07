import { GET_TOPUP_COMMON_REPORT, GET_TOPUP_COMMON_REPORT_DOWNLOAD_EXCEL_REPORT, GET_TOPUP_COMMON_REPORT_DOWNLOAD_PDF_REPORT, RESET_TOPUP_COMMON_REPORT, RESET_TOPUP_COMMON_REPORT_EXCEL_DOWNLOAD, RESET_TOPUP_COMMON_REPORT_PDF_DOWNLOAD } from '../action/TopUpCommonReportAction';

const initialState = {
    getTopupCommonResponseReport : [],
    getTopupCommonDownloadPdfResponseReport : undefined,
    getTopupCommonDownloadExcelResponseReport : undefined,
}

const TopUpCommonReportReducer =(state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_TOPUP_COMMON_REPORT:
            return{...state,getTopupCommonResponseReport:action.data}; 
            case GET_TOPUP_COMMON_REPORT_DOWNLOAD_PDF_REPORT:
                return{...state,getTopupCommonDownloadPdfResponseReport:action.data};
                case GET_TOPUP_COMMON_REPORT_DOWNLOAD_EXCEL_REPORT:
                return{...state,getTopupCommonDownloadExcelResponseReport:action.data};
                case RESET_TOPUP_COMMON_REPORT:
                    return{...state,getTopupCommonResponseReport:[]}
                    case RESET_TOPUP_COMMON_REPORT_PDF_DOWNLOAD:
                        return{...state,getTopupCommonDownloadPdfResponseReport : undefined};
                        case RESET_TOPUP_COMMON_REPORT_EXCEL_DOWNLOAD:
                            return{...state,getTopupCommonDownloadExcelResponseReport : undefined};   
            default:
                return state
    }
    
} 

export default TopUpCommonReportReducer