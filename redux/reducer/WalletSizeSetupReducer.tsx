import { GET_WALLET_FEATURE_CODE_DATA, GET_WALLET_SIZE_SETUP_DATA, RESET_UPDATE_WALLET_SIZE_SETUP_DATA, UPDATE_WALLET_SIZE_SETUP_DATA } from "../action/WalletSizeSetupAction";

const initialState = {
    getWalletSizeSetupResponse: [],
    updateWalletSizeSetupResponse:[]
  };
  
  const WalletSizeSetupReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_WALLET_SIZE_SETUP_DATA:
        return { ...state, getWalletSizeSetupResponse: action.data };
      case UPDATE_WALLET_SIZE_SETUP_DATA:
        return { ...state,updateWalletSizeSetupResponse:action.data} 
      case RESET_UPDATE_WALLET_SIZE_SETUP_DATA:
        return { ...state,updateWalletSizeSetupResponse:[]}   
      case GET_WALLET_FEATURE_CODE_DATA:
        return { ...state,getWalletFeatureCoderesponse:action.data}  
      default:
        return state;
    }
  };
  export default WalletSizeSetupReducer;
  