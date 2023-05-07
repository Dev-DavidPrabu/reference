import {
    GET_BANK_SETUP_RECORDS_DATA, RESET_UPDATE_BANK_SETUP, UPDATE_BANK_SETUP_RECORDS_DATA,GET_VIEW_BANK_SETUP_RECORDS_DATA, RESET_GET_BANK_SETUP
  } from "../action/BankSetupAction";
  
  const initialState = {
    getBankSetupResponse:[]
  };
  
  const BankSetupReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_BANK_SETUP_RECORDS_DATA:
        return { ...state, getBankSetupResponse: action.data };
      case UPDATE_BANK_SETUP_RECORDS_DATA:
        return { ...state,updateBankSetupResponse : action.data}  
      case RESET_UPDATE_BANK_SETUP:
          return { ...state, updateBankSetupResponse: [] };
      case GET_VIEW_BANK_SETUP_RECORDS_DATA:
          return { ...state, getViewBankSetupResponse: action.data };
      case RESET_GET_BANK_SETUP:
          return {...state,getBankSetupResponse:[]}        
      default:
        return state;
    }
  };
  export default BankSetupReducer;
  