import { GET_PAYOUT_COUNTRY_DATA, ADD_PAYOUT_COUNTRY_DETAILS,RESET_UPDATE_PAYOUT_COUNTRY_DATA, UPDATE_PAYOUT_COUNTRY,RESET_CREATED_PAYOUT_COUNTRY_DATA } from "../action/RemitPayoutCountryAction";


 const initialState = {
  updatePayoutCountryDataResponse: [],
  getAllCompanyDataResponse: [],
};

const RemitPayoutCountryReducer = (state = initialState,action: { type: string; data: any }
    ) => {
      switch (action.type) {
       
        case  GET_PAYOUT_COUNTRY_DATA :
          return { ...state, getPayoutCountryRecordsResponse: action.data };
          case  UPDATE_PAYOUT_COUNTRY :
            return { ...state, updatePayoutCountryRecordsResponse: action.data };
            case RESET_UPDATE_PAYOUT_COUNTRY_DATA:
      return {
        ...state,
        updatePayoutCountryRecordsResponse: [],
      };
        case  ADD_PAYOUT_COUNTRY_DETAILS :
          return { ...state, addPayoutCountryRecordsResponse: action.data };
          case RESET_CREATED_PAYOUT_COUNTRY_DATA:
            return {
              ...state,
              addPayoutCountryRecordsResponse: [],
            };  
        default:
          return state;
      }
    };
    export default RemitPayoutCountryReducer;