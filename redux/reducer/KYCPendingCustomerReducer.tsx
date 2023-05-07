import {
    GET_KYC_PENDING_CUSTOMER,
    GET_KYC_CUSTOMER_DETAILS,
    RESET_KYC_CUSTOMER_DETAILS,
  } from "../action/KYCPendingCustomerAction";
  
  const initialState = {
    getKYCPendingCustomerResponse: [],
    getCustomerDetails:[],
    
  };
  
  const KYCPendingCustomerReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_KYC_PENDING_CUSTOMER:
        return { ...state, getKYCPendingCustomerResponse: action.data };
        case GET_KYC_CUSTOMER_DETAILS:
          return { ...state, getCustomerDetails: action.data };
        case RESET_KYC_CUSTOMER_DETAILS:
          return { ...state, getCustomerDetails: [] };
      default:
        return state;
    }
  };
  export default KYCPendingCustomerReducer;
  