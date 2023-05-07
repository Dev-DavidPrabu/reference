import { GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL, GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF, GET_PAYROLL_DETAIL_REPORT, RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL, RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF, RESET_PAYROLL_DETAIL_REPORT } from "../action/PayrollDetailReportAction";

const initialState ={
    getPayrollDetailReportresponse : [],
    getPayrollDetailPdfDownloadReportResponse : undefined,
    getPayrollDetailExcelDownloadReportResponse : undefined,
}

const PayrollDetailReportReducer = (state=initialState,action:{type: string; data: any }) =>{
   switch (action.type){
        case GET_PAYROLL_DETAIL_REPORT:
            return{...state,getPayrollDetailReportresponse:action.data};
            case GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF:
                return{...state,getPayrollDetailPdfDownloadReportResponse:action.data};
                case GET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL:
                    return{...state,getPayrollDetailExcelDownloadReportResponse:action.data};
                case RESET_PAYROLL_DETAIL_REPORT:
                    return{...state,getPayrollDetailReportresponse:[]}
                    case RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_PDF:
                        return{...state,getPayrollDetailPdfDownloadReportResponse : undefined}
                        case RESET_PAYROLL_DETAIL_DOWNLOAD_REPORT_EXCEL:
                            return{...state,getPayrollDetailExcelDownloadReportResponse : undefined }
            default:
                return state
    }
}
export default PayrollDetailReportReducer