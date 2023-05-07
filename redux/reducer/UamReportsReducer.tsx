import {GET_UAM_REPORTS, RESET_UAM_REPORTS, GET_UAM_DOWNLOAD_REPORTS_PDF, GET_UAM_DOWNLOAD_REPORTS_EXCEL, RESET_UAM_DOWNLOAD_REPORTS_PDF, RESET_UAM_DOWNLOAD_REPORTS_EXCEL} from '../action/UamReportsAction'

const initialState = {
    getUamReportsResponse:[],
    getUamDownloadpdfResponse:undefined,
    getUamDownloadExcelResponse:undefined,
  };

const UamReportsReducer=(state=initialState,action:{type:string,data:any})=>{
    switch(action.type){
        case GET_UAM_REPORTS:{
            return {...state,getUamReportsResponse:action.data}
        }
        case GET_UAM_DOWNLOAD_REPORTS_PDF:{
            return {...state,getUamDownloadpdfResponse:action.data}
        }
        case GET_UAM_DOWNLOAD_REPORTS_EXCEL:{
            return {...state,getUamDownloadExcelResponse:action.data}
        }
        case  RESET_UAM_REPORTS:{
            return {...state, getUamReportsResponse:[]}
        }
        case RESET_UAM_DOWNLOAD_REPORTS_PDF:{
            return {...state,getUamDownloadpdfResponse:undefined}   
        }
        case RESET_UAM_DOWNLOAD_REPORTS_EXCEL:{
            return {...state,getUamDownloadExcelResponse:undefined}   
        }
        default:
            return state
    }
}
export default UamReportsReducer