import { GET_COUNTRY_REGORDS_DATA ,GET_BANK_REGORDS_DATA,
  GET_BRANCH_LIST_REGORDS_DATA,
   RESET_BANK_SETUP,
   UPDATE_BRANCH_DETAILS,
   RESET_UPDATE_BRANCH_DETAILS
  } from "../action/RemitBranchSetupAction";

  
  
  const initialState = {
  };
  
  const RemitBranchSetupReducer = (state = initialState,action: { type: string; data: any }
  ) => {
    switch (action.type) {
     
      case  GET_COUNTRY_REGORDS_DATA :
        return { ...state, getCountryRegordsResponse: action.data };

      case  GET_BANK_REGORDS_DATA :
        return { ...state, getBankRegordsResponse: action.data };

      case  GET_BRANCH_LIST_REGORDS_DATA :
        return { ...state, getBranchListRegordsResponse: action.data };
      case RESET_BANK_SETUP :
        return { ...state, getCountryRegordsResponse: [] };
      case UPDATE_BRANCH_DETAILS:
        return {...state, updatedBranchDataResponse:action.data};
      case RESET_UPDATE_BRANCH_DETAILS:
        return {...state, updatedBranchDataResponse:[]};
      default:
        return state;
    }
  };
  export default RemitBranchSetupReducer;
  