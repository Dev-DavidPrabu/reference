import { GET_USER_COMPANY } from "../action/ViewCompanyUserListAction";


  
  const initialState = {
    getCompanyUserResponse: [],
  };
  
  const ViewCompanyUserListReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_USER_COMPANY:
        return { ...state, getViewompanyUserResponse: action.data };
      default:
        return state;
    }
  };
  export default ViewCompanyUserListReducer;
  