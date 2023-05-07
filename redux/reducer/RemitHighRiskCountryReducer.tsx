import {
    GET_HIGH_RISK_COUNTRY_LIST,
    EDIT_HIGH_RISK_COUNTRY,
    RESET_EDIT_HIGH_RISK_COUNTRY
  } from "../action/RemitHighRiskCountryAction";

  
  const initialState = {
    getAllHighRiskCountryList: [],
    getHighRiskCountryError:[],
  };
  
  const RemitHighRiskCountryReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_HIGH_RISK_COUNTRY_LIST:
        return { ...state, getAllHighRiskCountryList: action.data };
      case EDIT_HIGH_RISK_COUNTRY:
          return { ...state, getHighRiskCountryError: action.data };
      case RESET_EDIT_HIGH_RISK_COUNTRY:
          return {...state, getHighRiskCountryError:[]};
      default:
        return state;
    }
  };
  export default RemitHighRiskCountryReducer;
