import { GET_WALLET_SIZE_BRAND_MAPPING_DATA, RESET_UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA, UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA } from "../action/WalletSizeBrandMappingAction";

const initialState = {
    getWalletSizeBrandMappingResponse: [],
    updateWalletSizeBrandMappingResponse:[]
  };
  
  const WalletSizeBrandMappingReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_WALLET_SIZE_BRAND_MAPPING_DATA:
        return { ...state, getWalletSizeBrandMappingResponse: action.data };
      case UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA:
        return { ...state,updateWalletSizeBrandMappingResponse: action.data}  
      case RESET_UPDATE_WALLET_SIZE_BRAND_MAPPING_DATA:
        return { ...state,updateWalletSizeBrandMappingResponse:[]}  
      default:
        return state;
    }
  };
  export default WalletSizeBrandMappingReducer;