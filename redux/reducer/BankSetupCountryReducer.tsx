import {
  GET_BANK_SETUP_COUNTRY_RECORDS_DATA,
  } from "../action/BankSetupCountryAction";
  
  const initialState = {};
  
  const BankSetupCountryReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_BANK_SETUP_COUNTRY_RECORDS_DATA:
        return { ...state, getBankSetupCountryResponse: action.data };
      default:
        return state;
    }
  };
  export default BankSetupCountryReducer;
  