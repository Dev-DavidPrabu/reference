import { ON_BEHALF_SENDER_DOWNLOAD_EXCEL_REPORT, ON_BEHALF_SENDER_DOWNLOAD_PDF_REPORT, ON_BEHALF_SENDER_REPORT, RESET_ONBEHALF_SENDER_REPORT, RESET_ONBEHALF_SENDER_REPORT_EXCEL_DOWNLOAD, RESET_ONBEHALF_SENDER_REPORT_PDF_DOWNLOAD } from "../action/OnBehalfSenderReportAction";

const initialState ={
    getOnbehalfsenderResponseReport :[],
    getOnbehalfDownloadResponsePdfReport:undefined,
    getOnbehalfDownloadResponseExcelReport:undefined,

}

const OnBehalfSenderReportReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case ON_BEHALF_SENDER_REPORT:
            return{...state,getOnbehalfsenderResponseReport:action.data};
            case ON_BEHALF_SENDER_DOWNLOAD_PDF_REPORT:
                return{...state,getOnbehalfDownloadResponsePdfReport:action.data};
                case ON_BEHALF_SENDER_DOWNLOAD_EXCEL_REPORT:
                    return{...state,getOnbehalfDownloadResponseExcelReport:action.data};
                case RESET_ONBEHALF_SENDER_REPORT:
                    return{...state,getOnbehalfsenderResponseReport:[]}
                    case RESET_ONBEHALF_SENDER_REPORT_PDF_DOWNLOAD:
                        return{...state,getOnbehalfDownloadResponsePdfReport:undefined}
                        case RESET_ONBEHALF_SENDER_REPORT_EXCEL_DOWNLOAD:
                        return{...state,getOnbehalfDownloadResponseExcelReport:undefined}
            default:
                return state
    }
}
export default OnBehalfSenderReportReducer
