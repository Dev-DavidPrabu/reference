import { GET_ECDD_AML_REPORT,RESET_ECDD_AML_REPORT, GET_ECDD_AML_PDF_DOWNLAOD, GET_ECDD_AML_EXCEL_DOWNLAOD, RESET_ECDD_AML_PDF_DOWNLOAD, RESET_ECDD_AML_EXCEL_DOWNLOAD} from "../action/ECDDReportAction"

const initialState={
    getEcddAmlReportResponse:[],
    getEcddAmlReportPdfDownloadResponse:undefined,
    getEcddAmlReportExcelDownloadResponse:undefined

}
export const ECDDAmlReportReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_ECDD_AML_REPORT:{
            return {...state,getEcddAmlReportResponse:action.data}
        }
        case GET_ECDD_AML_PDF_DOWNLAOD:{
            return {...state,getEcddAmlReportPdfDownloadResponse:action.data}
        }
        case GET_ECDD_AML_EXCEL_DOWNLAOD:{
            return {...state,getEcddAmlReportExcelDownloadResponse:action.data}
        }
        case RESET_ECDD_AML_REPORT:{
            return {...state,getEcddAmlReportResponse:[]}
        }
        case RESET_ECDD_AML_PDF_DOWNLOAD:{
            return {...state,getEcddAmlReportPdfDownloadResponse:undefined}
        }
        case RESET_ECDD_AML_EXCEL_DOWNLOAD:{
            return {...state,getEcddAmlReportExcelDownloadResponse:undefined}
        }
        default:
            return state
    }
}