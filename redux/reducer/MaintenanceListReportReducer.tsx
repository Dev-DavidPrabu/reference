import {RESET_MAINTENANCE_lIST_DOWNLOAD_PDF,RESET_MAINTENANCE_lIST_DOWNLOAD_EXCEL,GET_MAINTENANCE_lIST_DOWNLOAD_EXCEL,GET_MAINTENANCE_lIST_DOWNLOAD_PDF, GET_MAINTENANCE_LIST_REPORT, RESET_MAINTENANCE_LIST_REPORT } from "../action/MaintenanceListReportAction";

const initialState = {
    getMaintenanceListResponseReport :[],
    getMaintenanceListPdfDownload :[],
    getMaintenanceListExcelDownload:[]

}

const MaintenanceListReportReducer = (state=initialState,action:{type: string; data: any })=>{
    switch (action.type){
        case GET_MAINTENANCE_LIST_REPORT:
        return{...state,getMaintenanceListResponseReport:action.data};
            case RESET_MAINTENANCE_LIST_REPORT:
                return{...state,getMaintenanceListResponseReport:[]}
                case GET_MAINTENANCE_lIST_DOWNLOAD_PDF:
                    return {...state,getMaintenanceListPdfDownload:action.data}
                    case GET_MAINTENANCE_lIST_DOWNLOAD_EXCEL:
                        return {...state,getMaintenanceListExcelDownload:action.data}
                        case RESET_MAINTENANCE_lIST_DOWNLOAD_PDF:
                            return {...state, getMaintenanceListPdfDownload :[]}
                            case RESET_MAINTENANCE_lIST_DOWNLOAD_EXCEL:
                                return {...state, getMaintenanceListExcelDownload :[]}

        default:
            return state
}

} 
export default MaintenanceListReportReducer