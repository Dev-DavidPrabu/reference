
import { GET_ALL_ACCOUNT_SUMMARY, RESET_ALL_ACCOUNT_SUMMARY,CREATE_ACCOUNT_SUMMARY,RESET_CREATE_SUMMARY,
  UPDATE_ACCOUNT_SUMMARY,RESET_UPDATE_SUMMARY
  } from "../action/AccountSummaryAction";
  
  const initialState = {
    getAllAccountSummaryResponse: [],
    getAddAccountSummaryResponse:[],
    updateAccountSummaryResponse:[],
  };
  
  const AccountSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_ALL_ACCOUNT_SUMMARY:
        return { ...state, getAllAccountSummaryResponse: action.data };
      case CREATE_ACCOUNT_SUMMARY:
          return { ...state, getAddAccountSummaryResponse: action.data };
      case UPDATE_ACCOUNT_SUMMARY:
          return { ...state, updateAccountSummaryResponse: action.data };
      case RESET_ALL_ACCOUNT_SUMMARY:
          return {...state, getAllAccountSummaryResponse:[]};
      case RESET_CREATE_SUMMARY:
          return { ...state, getAddAccountSummaryResponse: []};
      case RESET_UPDATE_SUMMARY:
          return { ...state, updateAccountSummaryResponse: []};
      default:
        return state;
    }
  };
  export default AccountSummaryReducer;
  