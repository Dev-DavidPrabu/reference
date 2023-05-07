import {
    GET_BANK_REFERENCE_DATA,
    GET_VENDOR_REFERENCE_DATA,
    GET_BANK_LIST,
    GET_VENDOR_LIST
  } from "../action/BankMenuActions";
  
  const initialState = {
    getAllBankResponse: [],
    getAllVendorResponse: [],
    getAllBankListResponse: [],
    getAllVendorListResponse: [],
  };
  
  const BankMenuReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_BANK_REFERENCE_DATA:
        return { ...state,  getAllBankResponse: action.data };
      case GET_VENDOR_REFERENCE_DATA:
        return { ...state, getAllVendorResponse: action.data };
      case GET_BANK_LIST:
        return { ...state, getAllBankListResponse: action.data };
      case GET_VENDOR_LIST:
            return { ...state, getAllVendorListResponse: action.data };
      default:
        return state;
    }
  };
  export default BankMenuReducer;