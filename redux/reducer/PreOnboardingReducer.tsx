import { POST_DATA,
  GET_BATCH_DATA,BATCH_DETAIL_DATA,RESET_BATCH_DATA,ADD_CUSTOMER_DATA,RESET_ADD_CUSTOMER_DATA, GET_NATIONALITY_RES, GET_LANGUAGE_RES, GET_RACE_RES, GET_COUNTRY_RES
} from "../action/PreOnboardingAction";

const initialState = {
  getAllReferenceDataResponse: [],
  createReferenceData:[],
  getAllBatchDataResponse:[],
  getBatchDetailsResponse: [],
  addNewCustomerResponse:[],
  getCountryDataRes:[]
};



const PreOnboardingReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case POST_DATA:
        return { ...state, getAllReferenceDataResponse: action.data };
      case GET_BATCH_DATA:
        return { ...state, getAllBatchDataResponse: action.data };
        case GET_NATIONALITY_RES:
          return { ...state, getNationalityDataRes: action.data };
          case GET_LANGUAGE_RES:
          return { ...state, getLanguageDataRes: action.data };
          case GET_RACE_RES:
          return { ...state, getRaceDataRes: action.data };
          case GET_COUNTRY_RES:
          return { ...state, getCountryDataRes: action.data };
      case BATCH_DETAIL_DATA:
        return { ...state, getBatchDetailsResponse: action.data};
      case RESET_BATCH_DATA:
        return { ...state, getAllBatchDataResponse: []};
      case ADD_CUSTOMER_DATA:
        return { ...state, addNewCustomerResponse: action.data};
      case RESET_ADD_CUSTOMER_DATA:
        return { ...state, addNewCustomerResponse: []};
      default:
        return state;
    }
  };
  export default PreOnboardingReducer;