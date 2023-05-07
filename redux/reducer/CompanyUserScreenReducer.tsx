import { CREATE_USER_COMPANY, RESET_CREATE_USER_COMPANY } from "../action/CompanyUserScreenAction";

  
  const initialState = {
    getCompanyUserResponse: [],
  };
  
  const CompanyUserScreenReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case CREATE_USER_COMPANY:
        return { ...state, getCompanyUserResponse: action.data };
        case RESET_CREATE_USER_COMPANY:
      return { ...state, getCompanyUserResponse: [] };
      default:
        return state;
    }
  };
  export default CompanyUserScreenReducer;
  