import {
    GET_RISK_FACTOR_LIST,
    EDIT_RISK_FACTOR,
    RESET_EDIT_RISK_FACTOR
  } from "../action/RemitRiskFactorAction";


  const initialState = {
    getAllRiskFactorList: [],
    getRiskFactorError:[],
  };
  
  const RemitRiskFactorReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_RISK_FACTOR_LIST:
        return { ...state, getAllRiskFactorList: action.data };
      case EDIT_RISK_FACTOR:
          return { ...state, getRiskFactorError: action.data };
      case RESET_EDIT_RISK_FACTOR:
          return {...state, getRiskFactorError:[]};
      default:
        return state;
    }
  };
  export default RemitRiskFactorReducer;