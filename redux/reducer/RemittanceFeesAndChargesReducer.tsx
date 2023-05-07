import {
    GET_CHARGE_CODE_LIST,
    GET_CHARGE_CODE_DETAIL,
    CREATE_CHARGE_CODE,
    RESET_CHARGE_CODE_ERROR
  } from "../action/RemittanceFeesAndChargesAction"; 
  
  const initialState = {
    getAllChargeCodeListResponse: [],
    getAllChargeCodeDetails:[],
    createChargeCodeMessage:[]
  };
  
  const RemittanceFeesAndChargesReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CHARGE_CODE_LIST:
        return { ...state, getAllChargeCodeListResponse: action.data };
      case GET_CHARGE_CODE_DETAIL:
        return { ...state, getAllChargeCodeDetails: action.data };
      case CREATE_CHARGE_CODE:
        return { ...state, createChargeCodeMessage: action.data };
      case RESET_CHARGE_CODE_ERROR:
        return { ...state, createChargeCodeMessage: []};
      default:
        return state;
    }
  };
  export default RemittanceFeesAndChargesReducer;
  