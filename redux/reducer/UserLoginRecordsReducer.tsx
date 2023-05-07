import { GET_LOGIN_REGORDS_DATA, RESET_LOGIN_RECORDS_DATA } from "../action/UserLoginRecordsAction";

  
  
  const initialState = {
  
  };
  
  const UserLoginRecordsReducer = (state = initialState,action: { type: string; data: any }
  ) => {
    switch (action.type) {
     
      case  GET_LOGIN_REGORDS_DATA :
        return { ...state, getLoginRegordsResponse: action.data };
      case  RESET_LOGIN_RECORDS_DATA :
        return { ...state, getLoginRegordsResponse: [] };
      default:
        return state;
    }
  };
  export default UserLoginRecordsReducer;
  