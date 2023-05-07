import {
    GET_OTP_TEMP_LIST
  } from "../action/OTPTempListAction";
  
  const initialState = {
    getOtp:[],
    
  };
  
  const OTPTempListReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_OTP_TEMP_LIST:
        return { ...state, getOtp: action.data };
      default:
        return state;
    }
  };
  export default OTPTempListReducer;
  