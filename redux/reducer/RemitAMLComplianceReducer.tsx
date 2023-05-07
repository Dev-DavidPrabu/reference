import {
    GET_REMIT_AML_COMPLIANCE_LIST,
    EDIT_REMIT_AML_COMPLIANCE,
    RESET_EDIT_REMIT_AML_COMPLIANCE
  } from "../action/RemitAMLComplianceAction";

  
  const initialState = {
    getAllRemitAMLCompliance: [],
    getRemitAMLComplianceError:[],
  };
  
  const RemitAMLComplianceReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_REMIT_AML_COMPLIANCE_LIST:
        return { ...state, getAllRemitAMLComplianceList: action.data };
      case EDIT_REMIT_AML_COMPLIANCE:
        return { ...state, getRemitAMLComplianceError: action.data };
      case RESET_EDIT_REMIT_AML_COMPLIANCE:
        return { ...state, getRemitAMLComplianceError: [] };
      default:
        return state;
    }
  };
  export default RemitAMLComplianceReducer;