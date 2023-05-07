import {
    GET_RISK_SCALE_LIST,
    CREATE_RISK_SCALE,
    RESET_CREATE_RISK_SCALE,
    EDIT_RISK_SCALE,
    RESET_EDIT_RISK_SCALE
  } from "../action/AmlRiskScaleAction";

  
  const initialState = {
    getAllRiskScaleList: [],
    getRiskCreateError:[],
    getRiskEditError:[]
  };
  
  const AmlRiskScaleReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_RISK_SCALE_LIST:
        return { ...state, getAllRiskScaleList: action.data };
      case CREATE_RISK_SCALE:
          return { ...state, getRiskCreateError: action.data };
      case RESET_CREATE_RISK_SCALE:
          return {...state, getRiskCreateError:[]};
      case EDIT_RISK_SCALE:
         return { ...state, getRiskEditError: action.data };
      case RESET_EDIT_RISK_SCALE:
        return { ...state, getRiskEditError: [] };
      default:
        return state;
    }
  };
  export default AmlRiskScaleReducer;