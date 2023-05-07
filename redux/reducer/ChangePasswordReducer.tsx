import { CHANGE_NEW_PASSWORD , CHANGE_PROFILE_DETAIL, DETAIL_RESPONSE, RESET_CHANGE_PROFILE_DETAIL } from "../action/ChangePasswordAction";

  const initialState = {
  };
  
  const ChangePasswordReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case CHANGE_NEW_PASSWORD:
        return { ...state, changeOldToNewPasswordRes: action.data }; 
      case CHANGE_PROFILE_DETAIL:
        return { ...state, changeToNewProfileRes: action.data };  
      case RESET_CHANGE_PROFILE_DETAIL:
        return { ...state,changeToNewProfileRes:[]}   
      case DETAIL_RESPONSE:
        return { ...state,detailNewResponse: action.data}         
      default:
        return state;
    }
  };
  export default ChangePasswordReducer;