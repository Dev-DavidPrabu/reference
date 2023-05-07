import {
    GET_MERCHANT_SUMMARY_LIST,
    GET_MERCHANT_BRANCH_SUMMARY_LIST,
    GET_MERCHANT_TELLER_SUMMARY_LIST,
    CREATE_MERCHANT_SETUP,
    RESET_CREATE_MERCHANT_SETUP,
    UPDATE_MERCHANT_SETUP,
    RESET_UPDATE_MERCHANT_SETUP,
    CREATE_MERCHANT_BRANCH_SETUP,
    RESET_CREATE_MERCHANT_BRANCH_SETUP,
    UPDATE_MERCHANT_BRANCH_SETUP,
    RESET_UPDATE_MERCHANT_BRANCH_SETUP,
    CREATE_MERCHANT_TELLER_SETUP,
    RESET_CREATE_MERCHANT_TELLER_SETUP,
    UPDATE_MERCHANT_TELLER_SETUP,
    RESET_UPDATE_MERCHANT_TELLER_SETUP
  } from "../action/MerchantSetupAction";


  const initialState = {
    getAllMerchantList: [],
    getAllMerchantBranchList: [],
    getAllMerchantTellerList: [],
    getMerchantCreateError:[],
    getMerchantUpdateError:[],
    getMerchantBranchCreateError:[],
    getMerchantBranchUpdateError:[],
    getMerchantTellerCreateError:[],
    getMerchantTellerUpdateError:[],
  };
  
  const MerchantSetupReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_MERCHANT_SUMMARY_LIST:
        return { ...state, getAllMerchantList: action.data };
      case CREATE_MERCHANT_SETUP:
          return { ...state, getMerchantCreateError: action.data };
      case RESET_CREATE_MERCHANT_SETUP:
          return {...state, getMerchantCreateError:[]};
      case UPDATE_MERCHANT_SETUP:
          return { ...state, getMerchantUpdateError: action.data };
      case RESET_UPDATE_MERCHANT_SETUP:
          return {...state, getMerchantUpdateError:[]};

      case GET_MERCHANT_BRANCH_SUMMARY_LIST:
        return { ...state, getAllMerchantBranchList: action.data };
      case CREATE_MERCHANT_BRANCH_SETUP:
            return { ...state, getMerchantBranchCreateError: action.data };
      case RESET_CREATE_MERCHANT_BRANCH_SETUP:
            return {...state, getMerchantBranchCreateError:[]};
      case UPDATE_MERCHANT_BRANCH_SETUP:
            return { ...state, getMerchantBranchUpdateError: action.data };
      case RESET_UPDATE_MERCHANT_BRANCH_SETUP:
            return {...state, getMerchantBranchUpdateError:[]};

      case GET_MERCHANT_TELLER_SUMMARY_LIST:
        return { ...state, getAllMerchantTellerList: action.data };
      case CREATE_MERCHANT_TELLER_SETUP:
          return { ...state, getMerchantTellerCreateError: action.data };
      case RESET_CREATE_MERCHANT_TELLER_SETUP:
          return {...state, getMerchantTellerCreateError:[]};
      case UPDATE_MERCHANT_TELLER_SETUP:
          return { ...state, getMerchantTellerUpdateError: action.data };
      case RESET_UPDATE_MERCHANT_TELLER_SETUP:
          return {...state, getMerchantTellerUpdateError:[]};
      default:
        return state;
    }
  };
  export default MerchantSetupReducer;