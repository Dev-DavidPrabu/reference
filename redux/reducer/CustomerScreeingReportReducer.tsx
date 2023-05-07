import { GET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT, GET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT, GET_CUSTOMER_SCREENING_REPORT, RESET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT, RESET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT, RESET_CUSTOMER_SCREENING_REPORT } from "../action/CustomerScreeningReportAction";

const initialState ={
    getCustomerScreeningReportresponse : [],
    getCustomerScreeingDownloadPdfReportResponse : undefined,
    getCustomerScreeingDownloadExcelReportResponse : undefined,

}

const CustomerScreeningReportReducer = (state=initialState,action:{type: string; data: any }) =>{
    switch (action.type){
        case GET_CUSTOMER_SCREENING_REPORT:
            return{...state,getCustomerScreeningReportresponse:action.data};
            case GET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT:
                return{...state,getCustomerScreeingDownloadPdfReportResponse:action.data};
                case GET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT:
                    return{...state,getCustomerScreeingDownloadExcelReportResponse:action.data};
                 case RESET_CUSTOMER_SCREENING_REPORT:
                    return{...state,getCustomerScreeningReportresponse:[]}
                    case RESET_CUSTOMER_SCREENING_DOWNLOAD_PDF_REPORT:
                        return{...state,getCustomerScreeingDownloadPdfReportResponse : undefined}
                        case RESET_CUSTOMER_SCREENING_DOWNLOAD_EXCEL_REPORT:
                        return{...state,getCustomerScreeingDownloadExcelReportResponse : undefined}
            default:
                return state
    }
}
export default CustomerScreeningReportReducer