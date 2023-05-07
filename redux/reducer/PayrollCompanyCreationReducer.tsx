import { GET_PAYROLL_COMPANY_CREATION_REPORT, GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF, GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL, RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF, RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL } from "../action/PayrollCompanyCreationAction"

const initialState={
    getPayrollCompanyReportResponse:[],
    getPayrollReportDownloadPdfResponse:undefined,
    getPayrollReportDownloadExcelResponse : undefined,
}
export const PayrollCompanyCreationReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_PAYROLL_COMPANY_CREATION_REPORT:{
            return {...state,getPayrollCompanyReportResponse:action.data}
        }
        case GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF:{
            return {...state,getPayrollReportDownloadPdfResponse:action.data}
        }
        case GET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL:{
            return {...state,getPayrollReportDownloadExcelResponse:action.data}
        }
        case RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_PDF:{
            return {...state,getPayrollReportDownloadPdfResponse:undefined,}
        }
        case RESET_PAYROLL_COMPANY_CREATION_DOWNLOAD_EXCEL :{
            return {...state,getPayrollReportDownloadExcelResponse : undefined,}
        }
        default:
            return state
    }
}