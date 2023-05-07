import {
  POST_NEW_CUSTOMER_DATA,
  GET_ALL_CUSTOMER_DATA,
  RESET_CUSTOMER_USER_INFO,
  SELETECTED_PREFUND_USER_INFO,UPDATE_CUSTOMER_DATA
} from "../action/CustomerOnboarding";

const initialState = {
  postNewCustomerDataResponse: [],
  getCustomerDataResponse: [],
  selectedPrefundUserInfo:{}
};
const CustomerOnboardingReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case POST_NEW_CUSTOMER_DATA:
      return { ...state, postNewCustomerDataResponse: action.data };
    case GET_ALL_CUSTOMER_DATA:
      return { ...state, getCustomerDataResponse: action.data };
    case RESET_CUSTOMER_USER_INFO:
      return { ...state, postNewCustomerDataResponse: null };
    case SELETECTED_PREFUND_USER_INFO:
      return { ...state, selectedPrefundUserInfo: action.data };
      case UPDATE_CUSTOMER_DATA:
        return { ...state, updateCustomerInfo: action.data };

    default:
      return state;
  }
};
export default CustomerOnboardingReducer;
