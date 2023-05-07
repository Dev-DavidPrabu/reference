import { ADD_UPGRADE_CARD_DETAILS, APPROVE_UPGRADE_STATUS_RESPONSE, CUSTOMER_CARD_UPGRADE_DETAILS, GET_IDDOC_RECORDS_DATA, GET_MOBILENO_DETAILS, GET_UPGRADE_CARD_RECORDS_DATA, GET_UPGRADE_TOGGLE_RESPONSE_RECORDS_DATA, GET_VERIFY_DETAILS, REJECT_UPGRADE_STATUS_RESPONSE, RESET_GET_CUSTOMER_DETAILS, RESET_GET_MOBILENO_DETAILS, RESET_VERIFY_DETAILS } from "../action/CardUpgradeAction";

  
  const initialState = {
    getUnBlockCardRequestResponse:[],
    customerDetailResponse:[],
    getVerfiyDetailResponse:[]
  };
  
  const CardUpgradeReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_UPGRADE_CARD_RECORDS_DATA:
        return { ...state, getUpgradeCardRequestResponse: action.data };
      case APPROVE_UPGRADE_STATUS_RESPONSE:
        return { ...state,approveUpgradeCardResponse: action.data };
      case REJECT_UPGRADE_STATUS_RESPONSE:
        return { ...state,rejectUpgradeCardResponse: action.data };
      case ADD_UPGRADE_CARD_DETAILS:
        return { ...state,addUpgradeCardResponse:action.data }; 
      case CUSTOMER_CARD_UPGRADE_DETAILS:
        return { ...state,customerDetailResponse:action.data}  ;
      case RESET_GET_CUSTOMER_DETAILS:
        return { ...state,customerDetailResponse:[]} 
      case GET_MOBILENO_DETAILS:
        return { ...state,getCustomerDetailsResponse:action.data}    
      case RESET_GET_MOBILENO_DETAILS:
        return { ...state,getCustomerDetailsResponse:[]}    
      case GET_IDDOC_RECORDS_DATA:
        return { ...state,getIddcocresponse:action.data}  
      case GET_UPGRADE_TOGGLE_RESPONSE_RECORDS_DATA:
        return { ...state,getToggleresponse:action.data}  
      case GET_VERIFY_DETAILS:
        return { ...state,getVerfiyDetailResponse:action.data}  
      case RESET_VERIFY_DETAILS:
        return { ...state,getVerfiyDetailResponse:[]}                 
      default:
        return state;
    }
  };
  export default CardUpgradeReducer;