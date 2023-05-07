import {
    GET__CUSTOMER_ENQUIRY_LIST,
    GET_KYC_CUSTOMER_ENQUIRY_DETAILS,
    RESET_KYC_CUSTOMER_ENQUIRY_DETAILS,
    GET_CUSTOMER_STATUS_DETAILS,
    RESET_CUSTOMER_STATUS_DETAILS,
    GET_CUSTOMER_HISTORY_LIST,
    GET_CUSTOMER_WALLET_HISTORY_LIST,
    UPDATE_CUSTOMER_PROFILE,
    RESET_UPDATE_CUSTOMER_PROFILE,
    GET_WALLET_LINK_LIST,
    GET_POSTAL_CODE_REFERENCE_DATA,
    GET_OCCUPATION_REFERENCE_DATA,
    GET_NATIONALITY_REFERENCE_DATA,
    GET_SOURCE_OF_FUND_REFERENCE_DATA,
    GET_SOURCE_OF_WEALTH_REFERENCE_DATA,
    GET_BANK_REFERENCE_DATA,
    GET_COUNTRY_REFERENCE_DATA,
    GET_IDTYPE_DATA,
    GET_OPS_REMARKS_LIST,
    GET_SOURCE_LIST,
    GET_PURPOSE_OF_CARD_LIST,
    GET_POSITION_HELD_LIST
  } from "../action/CustomerEnquiryAction";
  
  const initialState = {
    getCustomerResponse: [],
    getCustomerDetails:[],
    getCustomerStatusDetails:[],
    getCustomerHistoryData:[],
    getCustomerWalletHistoryData:[],
    updateCustomerError:[],
    getAllWalletLinkList:[],
    getPostalCodeList:[],
    getNationalityList:[],
    getOccupationList:[],
    getSourceOfFundList:[],
    getSourceOfWealthList:[],
    getBankList:[],
    getCountryList:[],
    getIdTypeList:[],
    getOpsRemarksList:[],
    getSourceList:[],
    getPurposeOfCardList:[],
    getPositionHeldList:[]
  };
  
  const KYCCustomerEnquiryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET__CUSTOMER_ENQUIRY_LIST:
        return { ...state, getCustomerResponse: action.data };
        case GET_KYC_CUSTOMER_ENQUIRY_DETAILS:
          return { ...state, getCustomerDetails: action.data };
        case RESET_KYC_CUSTOMER_ENQUIRY_DETAILS:
          return { ...state, getCustomerDetails: [] };
        case GET_CUSTOMER_STATUS_DETAILS:
          return { ...state, getCustomerStatusDetails: action.data };
        case RESET_CUSTOMER_STATUS_DETAILS:
          return { ...state, getCustomerStatusDetails: [] };
        case GET_CUSTOMER_HISTORY_LIST:
          return { ...state, getCustomerHistoryData: action.data};
        case GET_CUSTOMER_WALLET_HISTORY_LIST:
          return { ...state, getCustomerWalletHistoryData: action.data};
        case UPDATE_CUSTOMER_PROFILE:
          return { ...state, updateCustomerError: action.data};
        case RESET_UPDATE_CUSTOMER_PROFILE:
          return { ...state, updateCustomerError:[]};
        case GET_WALLET_LINK_LIST:
          return { ...state, getAllWalletLinkList: action.data};
        case GET_POSTAL_CODE_REFERENCE_DATA:
          return { ...state, getPostalCodeList: action.data};
        case GET_OCCUPATION_REFERENCE_DATA:
          return { ...state, getOccupationList: action.data};
        case GET_NATIONALITY_REFERENCE_DATA:
          return { ...state, getNationalityList: action.data};
        case GET_SOURCE_OF_FUND_REFERENCE_DATA:
          return { ...state, getSourceOfFundList: action.data};
        case GET_SOURCE_OF_WEALTH_REFERENCE_DATA:
          return { ...state, getSourceOfWealthList: action.data};
        case GET_BANK_REFERENCE_DATA:
          return { ...state, getBankList: action.data};
        case GET_COUNTRY_REFERENCE_DATA:
          return { ...state, getCountryList: action.data};
        case GET_IDTYPE_DATA:
          return { ...state, getIdTypeList: action.data};
        case GET_OPS_REMARKS_LIST:
          return { ...state, getOpsRemarksList: action.data};
        case GET_SOURCE_LIST:
          return { ...state, getSourceList: action.data};
        case GET_PURPOSE_OF_CARD_LIST:
          return { ...state, getPurposeOfCardList: action.data};
        case GET_POSITION_HELD_LIST:
          return { ...state, getPositionHeldList: action.data};
      default:
        return state;
    }
  };
  export default KYCCustomerEnquiryReducer;
  