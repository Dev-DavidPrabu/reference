import {  GET_SALES_EXCEL_DOWNLOAD_REPORT, GET_SALES_PDF_DOWNLOAD_REPORT, GET_SALES_REPORT, RESET_SALES_EXCEL_DOWNLOAD_REPORT, RESET_SALES_PDF_DOWNLOAD_REPORT, RESET_SALES_REPORT } from "../action/SalesReportAction";

const initialState ={
    getSalesReportresponse : [],
    getSalesReportPdfDownloadReportResponse : undefined,
    getSalesReportExcelDownloadReportResponse : undefined,

}

const SalesReportReducer = (state=initialState,action:{type: string; data: any }) =>{
    switch (action.type){
        case GET_SALES_REPORT:
            return{...state,getSalesReportresponse:action.data};
        case GET_SALES_PDF_DOWNLOAD_REPORT:
                return{...state,getSalesReportPdfDownloadReportResponse:action.data};
        case GET_SALES_EXCEL_DOWNLOAD_REPORT:
                return{...state,getSalesReportExcelDownloadReportResponse:action.data};
        case RESET_SALES_REPORT:
                    return{...state,getSalesReportresponse:[]}
        case RESET_SALES_PDF_DOWNLOAD_REPORT:
                        return{...state,getSalesReportPdfDownloadReportResponse:undefined}
        case RESET_SALES_EXCEL_DOWNLOAD_REPORT:
                            return{...state,getSalesReportExcelDownloadReportResponse:undefined}
            default:
                return state
    }
}
export default SalesReportReducer