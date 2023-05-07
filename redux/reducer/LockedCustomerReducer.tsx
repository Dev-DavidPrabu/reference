import { GET_LOCKED_CUSTOMER_DATA,UNLOCKED_CUSTOMER_INFO ,
  RESET_UNLOCKED_CUSTOMER_INFO
} from "../action/LockedCustomerAction";

  
  
  const initialState = {
  
  };
  
  const LockedCustomerReducer = (state = initialState,action: { type: string; data: any }
  ) => {
    switch (action.type) {
     
      case  GET_LOCKED_CUSTOMER_DATA :
        return { ...state, getLockedCustomerResponse: action.data };
        case UNLOCKED_CUSTOMER_INFO:
            return{...state,unlockCustomerResponse: action.data};
      case RESET_UNLOCKED_CUSTOMER_INFO:
        return { ...state, unlockCustomerResponse:[]}
      default:
        return state;
    }
  };
  export default LockedCustomerReducer;
  