import { CUSTOMER_LOGIN_REPORT, CUSTOMER_LOGIN_REPORT_DOWNLOAD_PDF,RESET_CUSTOMER_LOGIN_REPORT,CUSTOMER_LOGIN_REPORT_DOWNLOAD_EXCEL, RESET_CUSTOMER_REPORT_DOWNLOAD_PDF, RESET_CUSTOMER_REPORT_DOWNLOAD_EXCEL } from "../action/CustomerLoginReportAction";

const initialState = {
    getCustomerResponsereport : [],
    downloadPdfResponse : undefined,
    downloadExcelResponse : undefined
}
const CustomerLoginReportReducer =(state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case CUSTOMER_LOGIN_REPORT:
            return{...state,getCustomerResponsereport:action.data};
            case CUSTOMER_LOGIN_REPORT_DOWNLOAD_PDF:
                return{...state,downloadPdfResponse:action.data}
            case CUSTOMER_LOGIN_REPORT_DOWNLOAD_EXCEL:
                return{...state,downloadExcelResponse:action.data}
            case RESET_CUSTOMER_LOGIN_REPORT:
                return{...state,getCustomerResponsereport:[]};
            case RESET_CUSTOMER_REPORT_DOWNLOAD_PDF:
                return{...state,downloadPdfResponse:undefined}
            case RESET_CUSTOMER_REPORT_DOWNLOAD_EXCEL:
                    return{...state,downloadExcelResponse:undefined}
            default:
                return state
    }
     
}

export default CustomerLoginReportReducer