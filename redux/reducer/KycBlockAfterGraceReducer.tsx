import { GET_KYC_BLOCK_AFTER_GRACE, RESET_KYC_BLOCK_AFTER_GRACE } from "../action/KycBlockAfterGraceAction";



  const initialState = {
    getKYCBlockAfterGraceResponse:[]
  };
  
  const KycBlockAfterGraceReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_KYC_BLOCK_AFTER_GRACE:
        return { ...state, getKYCBlockAfterGraceResponse: action.data };
      case RESET_KYC_BLOCK_AFTER_GRACE:
        return { ...state,getKYCBlockAfterGraceResponse:[]}    

      default:
        return state;
    }
  };
  export default KycBlockAfterGraceReducer;