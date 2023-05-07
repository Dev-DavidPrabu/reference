import {
    GET_RISK_FACTOR_STATUS_LIST,
    EDIT_RISK_FACTOR_STATUS,
    RESET_EDIT_RISK_FACTOR_STATUS
  } from "../action/RemitRiskFactorStatusConfigurationAction";

  
  const initialState = {
    getAllRiskFactorStatusList: [],
    getRiskFactorStatusError:[],
  };
  
  const RemitRiskFactorStatusConfigurationReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_RISK_FACTOR_STATUS_LIST:
        return { ...state, getAllRiskFactorStatusList: action.data };
      case EDIT_RISK_FACTOR_STATUS:
          return { ...state, getRiskFactorStatusError: action.data };
      case RESET_EDIT_RISK_FACTOR_STATUS:
          return {...state, getRiskFactorStatusError:[]};
      default:
        return state;
    }
  };
  export default RemitRiskFactorStatusConfigurationReducer;
