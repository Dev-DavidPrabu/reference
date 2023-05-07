import { GET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT, GET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT, GET_PREFUND_BALANCE_BY_COMPANY_REPORT, RESET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT, RESET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT, RESET_PREFUND_BALANCE_BY_COMPANY_REPORT } from "../action/PrefundBalanceByCompanyAction";

const initialState = {
    getPrefundBalanceByCompanyresponse : [],
    getPrefundBalanceByCompanyPdfDownloadReportResponse : undefined,
    getPrefundBalanceByCompanyExcelDownloadReportResponse : undefined,

}

const PrefundBalanceByCompanyReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_PREFUND_BALANCE_BY_COMPANY_REPORT:
            return{...state,getPrefundBalanceByCompanyresponse:action.data};
            case GET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT:
                return{...state,getPrefundBalanceByCompanyPdfDownloadReportResponse:action.data};
            case GET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT:
                return{...state,getPrefundBalanceByCompanyExcelDownloadReportResponse:action.data};
            case RESET_PREFUND_BALANCE_BY_COMPANY_REPORT:
                    return{...state,getPrefundBalanceByCompanyresponse:[]}
            case RESET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT:
                        return{...state,getPrefundBalanceByCompanyPdfDownloadReportResponse:undefined}
            case RESET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT:
                        return{...state,getPrefundBalanceByCompanyExcelDownloadReportResponse:undefined}
            default:
                return state
    }
}

export default PrefundBalanceByCompanyReducer