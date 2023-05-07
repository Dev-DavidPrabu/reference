import {
    GET_PROMO_CODE_LIST,
    CREATE_PROMO_CODE_SETUP,
    RESET_CREATE_PROMO_CODE_SETUP,
    UPDATE_PROMO_CODE_SETUP,
    RESET_UPDATE_PROMO_CODE_SETUP,
    GET_PROMO_CUSTOMER_ENQUIRY_DETAILS,
    RESET_PROMO_CUSTOMER_ENQUIRY_DETAILS,
    GET_PROMO_GROUP_CUSTOMERS_LIST,
    RESET_PROMO_GROUP_CUSTOMERS_LIST
  } from "../action/PromoCodeSummaryAction";


  const initialState = {
    getAllPromoCodeList: [],
    getPromoCodeCreateError:[],
    getPromoCodeUpdateError:[],
    getPromoCustomerDetails:[],
    getPromoGroupCustomersList:[]
  };
  
  const PromoCodeSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_PROMO_CODE_LIST:
        return { ...state, getAllPromoCodeList: action.data };
      case CREATE_PROMO_CODE_SETUP:
          return { ...state, getPromoCodeCreateError: action.data };
      case RESET_CREATE_PROMO_CODE_SETUP:
          return {...state, getPromoCodeCreateError:[]};
      case UPDATE_PROMO_CODE_SETUP:
          return { ...state, getPromoCodeUpdateError: action.data };
      case RESET_UPDATE_PROMO_CODE_SETUP:
          return {...state, getPromoCodeUpdateError:[]};
      case GET_PROMO_CUSTOMER_ENQUIRY_DETAILS:
          return { ...state, getPromoCustomerDetails: action.data };
      case RESET_PROMO_CUSTOMER_ENQUIRY_DETAILS:
          return { ...state, getPromoCustomerDetails: [] };
      case GET_PROMO_GROUP_CUSTOMERS_LIST:
          return { ...state, getPromoGroupCustomersList: action.data };
      case RESET_PROMO_GROUP_CUSTOMERS_LIST:
          return { ...state, getPromoGroupCustomersList: [] };
      default:
        return state;
    }
  };
  export default PromoCodeSummaryReducer;