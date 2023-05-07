import {AUDIT_TRIAL_DOWNLOAD_EXCEL, AUDIT_TRIAL_DOWNLOAD_PDF,
    RESET_AUDIT_TRIAL_EXCEL,RESET_AUDIT_TRIAL_PDF,GET_ALL_AUDIT_FUNCTION,GET_ALL_AUDIT_MODULE,
    RESET_ALL_AUDIT_FUNCTION,RESET_ALL_AUDIT_MODULE } from "../action/AuditTrailReportAction";

const initialState = {
    getAllAuditTrialFunctionResponse:[],
    getAllAuditModuleResponse:[],
    getAuditTrialPdfResponse:undefined,
    getAuditTrialExcelResponse:undefined,
    getAuditFunctionDropDown:[],
    getAuditModuleDropDown:[]
  };
  
  const AuditTrailReportReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_ALL_AUDIT_FUNCTION:
        return { ...state, getAllAuditTrialFunctionResponse:action.data}
      case GET_ALL_AUDIT_MODULE:
        return { ...state, getAllAuditModuleResponse:action.data}
        case RESET_ALL_AUDIT_FUNCTION:
          return { ...state, getAllAuditTrialFunctionResponse:[]}
        case RESET_ALL_AUDIT_MODULE:
          return { ...state, getAllAuditModuleResponse:[]}
      case AUDIT_TRIAL_DOWNLOAD_EXCEL:
        return { ...state, getAuditTrialExcelResponse: action.data };
      case AUDIT_TRIAL_DOWNLOAD_PDF:
        return { ...state, getAuditTrialPdfResponse: action.data };
      case RESET_AUDIT_TRIAL_EXCEL:
        return { ...state,getAuditTrialExcelResponse: undefined };
      case RESET_AUDIT_TRIAL_PDF:
        return { ...state,getAuditTrialPdfResponse: undefined };                  
      default:
        return state;
    }
  };
  export default AuditTrailReportReducer;