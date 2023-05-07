import {
  GET_AML_PENDING_CUSTOMERS_LIST,
  GET_AML_CUSTOMER_INFO,
  RESET_APPROVE_REJECT_STATUS,
  APPROVE_REJECT_STATUS
} from "../action/AmlPendingCustomersAction";

const initialState = {
  getAmlPendingCustomersList: [],
  getAmlCustomersInfo: [],
  approveRejectMessage:[],
};

const AmlPendingCustomersReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_AML_PENDING_CUSTOMERS_LIST:
      return { ...state, getAmlPendingCustomersList: action.data };
    case GET_AML_CUSTOMER_INFO:
      return { ...state, getAmlCustomersInfo: action.data };
    case APPROVE_REJECT_STATUS:
      return { ...state, approveRejectMessage: action.data };
    case RESET_APPROVE_REJECT_STATUS:
      return { ...state, approveRejectMessage: [] };
    default:
      return state;
  }
};
export default AmlPendingCustomersReducer;
