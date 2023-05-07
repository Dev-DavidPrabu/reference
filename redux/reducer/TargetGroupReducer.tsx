import {
    GET_TARGET_GROUP_LIST,
    CREATE_TARGET_GROUP_BY_CUSTOMERS,
    RESET_CREATE_TARGET_GROUP_BY_CUSTOMERS,
    EDIT_TARGET_GROUP_BY_CUSTOMERS,
    RESET_EDIT_TARGET_GROUP_BY_CUSTOMERS,
    GET_TARGET_GROUP_BY_CUSTOMERS_LIST,
    RESET_TARGET_GROUP_BY_CUSTOMERS_LIST,
    GET_NATIONALITY_REFERENCE_DATA,
    GET_REMIT_COUNTRY_REFERENCE_DATA,
    GET_REMIT_PAYMENT_METHOD_REFERENCE_DATA,
    GET_GROUP_CUSTOMER_ENQUIRY_DETAILS,
    RESET_GROUP_CUSTOMER_ENQUIRY_DETAILS
  } from "../action/TargetGroupAction";

  
  const initialState = {
    getAllTargetGroupList: [],
    getTargetGroupByCustomersError:[],
    getTargetGroupByCustomersList:[],
    getTargetGroupByCustomersEditError:[],
    getNationalityReferenceData:[],
    getRemitCountryReferenceData:[],
    getRemitPaymentMethodReferenceData:[],
    getGroupCustomerDetails:[]
  };
  
  const TargetGroupReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_TARGET_GROUP_LIST:
        return { ...state, getAllTargetGroupList: action.data };
      case CREATE_TARGET_GROUP_BY_CUSTOMERS:
          return { ...state, getTargetGroupByCustomersError: action.data };
      case RESET_CREATE_TARGET_GROUP_BY_CUSTOMERS:
          return {...state, getTargetGroupByCustomersError:[]};
      case EDIT_TARGET_GROUP_BY_CUSTOMERS:
         return { ...state, getTargetGroupByCustomersEditError: action.data };
      case RESET_EDIT_TARGET_GROUP_BY_CUSTOMERS:
        return { ...state, getTargetGroupByCustomersEditError: [] };
      case GET_TARGET_GROUP_BY_CUSTOMERS_LIST:
        return { ...state, getTargetGroupByCustomersList: action.data };
      case RESET_TARGET_GROUP_BY_CUSTOMERS_LIST:
        return { ...state, getTargetGroupByCustomersList: [] };
      case GET_NATIONALITY_REFERENCE_DATA:
        return { ...state, getNationalityReferenceData: action.data };
      case GET_REMIT_COUNTRY_REFERENCE_DATA:
        return { ...state, getRemitCountryReferenceData: action.data };
      case GET_REMIT_PAYMENT_METHOD_REFERENCE_DATA:
        return { ...state, getRemitPaymentMethodReferenceData: action.data };
      case GET_GROUP_CUSTOMER_ENQUIRY_DETAILS:
        return { ...state, getGroupCustomerDetails: action.data };
      case RESET_GROUP_CUSTOMER_ENQUIRY_DETAILS:
        return { ...state, getGroupCustomerDetails: [] };
      default:
        return state;
    }
  };
  export default TargetGroupReducer;