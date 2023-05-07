import { GET_PAYROLL_TXN_BY_COMPANY, GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL, GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF, RESET_PAYROLL_TXN_BY_COMPANY, RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL, RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF } from "../action/PayrolltxnByCompanyAction";

const initialState = {
    getPayrollTxnByCompanyresponse : [],
    getPayrollTxnByCompanyPdfDownloadReportResponse : undefined,
    getPayrollTxnByCompanyExcelDownloadReportResponse : undefined,

}

const PayrollTxnByCompanyReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_PAYROLL_TXN_BY_COMPANY:
            return{...state,getPayrollTxnByCompanyresponse:action.data};
            case GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF:
                return{...state,getPayrollTxnByCompanyPdfDownloadReportResponse:action.data};
            case GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL:
                    return{...state,getPayrollTxnByCompanyExcelDownloadReportResponse:action.data};
            case RESET_PAYROLL_TXN_BY_COMPANY:
                    return{...state,getPayrollTxnByCompanyresponse:[]}
            case RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF:
                        return{...state,getPayrollTxnByCompanyPdfDownloadReportResponse : undefined}
            case RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL:
                        return{...state,getPayrollTxnByCompanyExcelDownloadReportResponse : undefined}
            default:
                return state
    }
}

export default PayrollTxnByCompanyReducer;