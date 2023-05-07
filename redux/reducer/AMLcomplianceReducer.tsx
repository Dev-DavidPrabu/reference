import { EDIT_AML_COMPLIANCE_DATA, GET_AML_COMPLIANCE_DATA, RESET_EDIT_COMPLIANCE_DATA } from "../action/AMLcomplianceAction";

  
  
  const initialState = {
  
  };
  
  const UserGroupCreateReducer = (state = initialState,action: { type: string; data: any }
  ) => {
    switch (action.type) {
     
      case  GET_AML_COMPLIANCE_DATA :
        return { ...state, getAMLcomplianceResponse: action.data };
      case EDIT_AML_COMPLIANCE_DATA:
            return{...state,updateAMLcomplianceResponse: action.data};
      case RESET_EDIT_COMPLIANCE_DATA:
            return{...state,updateAMLcomplianceResponse: []};
      default:
        return state;
    }
  };
  export default UserGroupCreateReducer;
  