import {  GET_LOCKED_BACK_OFFICE_DATA, UNLOCKED_BACK_OFFICE_INFO } from "../action/LockedBackOfficeUserAction";



  
  
  const initialState = {
  
  };
  
  const LockedBackOfficeUserReducer = (state = initialState,action: { type: string; data: any }
  ) => {
    switch (action.type) {
     
      case  GET_LOCKED_BACK_OFFICE_DATA :
        return { ...state, getLockedBackOfficeResponse: action.data };
      case UNLOCKED_BACK_OFFICE_INFO:
            return{...state,unlockBackOfficeResponse: action.data}; 
      default:
        return state;
    }
  };
  export default LockedBackOfficeUserReducer;
  