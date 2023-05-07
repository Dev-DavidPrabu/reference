import { GET_WALLET_FEATURE_SUMMARY, RESET_WALLET_FEATURE_SUMMARY,
  RESET_ADD_WALLET_SUMMARY,ADD_WALLET_SUMMARY, WALLET_FEATURE_DATA_DELETE, RESET_DELETE_WALLET_FEATURE_DATA
  } from "../action/WalletFeatureSummaryAction";
  
  const initialState = {
    getAllWalletFeatureResponse: [],
  };
  
  const WalletFeatureSummaryReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_WALLET_FEATURE_SUMMARY:
        return { ...state, getAllWalletFeatureResponse: action.data };
      case RESET_WALLET_FEATURE_SUMMARY:
        return { ...state, getAllWalletFeatureResponse: []};
      case ADD_WALLET_SUMMARY:
        return { ...state, newWalletFeature: action.data};
      case RESET_ADD_WALLET_SUMMARY:
        return { ...state, newWalletFeature: []};
      case WALLET_FEATURE_DATA_DELETE : 
        return{...state, deleteWalletFeatureResponse : action.data}
        case RESET_DELETE_WALLET_FEATURE_DATA:
          return { ...state, deleteWalletFeatureResponse:[]};
      default:
        return state;
    }
  };
  export default WalletFeatureSummaryReducer;
  