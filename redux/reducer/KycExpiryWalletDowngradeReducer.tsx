import { GET_KYC_EXPIRY_DOWNGRADE, RESET_KYC_EXPIRY_DOWNGRADE } from "../action/KycExpiryWalletDowngradeAction";



  const initialState = {
    getKYCExpiryDowngradeResponse:[]
  };
  
  const KycExpiryWalletDowngradeReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_KYC_EXPIRY_DOWNGRADE:
        return { ...state, getKYCExpiryDowngradeResponse: action.data };
      case RESET_KYC_EXPIRY_DOWNGRADE:
        return { ...state,getKYCExpiryDowngradeResponse:[]}    

      default:
        return state;
    }
  };
  export default KycExpiryWalletDowngradeReducer;