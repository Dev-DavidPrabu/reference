import {
    GET_ECDD_SETUP_LIST,
    CREATE_ECDD_SETUP,
    RESET_CREATE_ECDD_SETUP
    
  } from "../action/AmlEcddSetupAction";
  
  const initialState = {
    getAllEcddList: [],
    getEcddCreateError:[],
  };
  
  const AmlEcddSetupReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_ECDD_SETUP_LIST:
        return { ...state, getAllEcddList: action.data };
      case CREATE_ECDD_SETUP:
          return { ...state, getEcddCreateError: action.data };
      case RESET_CREATE_ECDD_SETUP:
          return {...state, getEcddCreateError:[]};
      default:
        return state;
    }
  };
  export default AmlEcddSetupReducer;
  