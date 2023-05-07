import {
    GET_RISK_RATING_LIST,
    CREATE_RISK_RATING,
    RESET_CREATE_RISK_RATING,
    EDIT_RISK_RATING,
    RESET_EDIT_RISK_RATING,
  } from "../action/RemitRiskRatingAction";

  
  const initialState = {
    getAllRiskRatingList: [],
    getRiskRatingError:[],
    getRiskRatingEditError:[],
  };
  
  const RemitRiskRatingReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_RISK_RATING_LIST:
        return { ...state, getAllRiskRatingList: action.data };
      case CREATE_RISK_RATING:
          return { ...state, getRiskRatingError: action.data };
      case RESET_CREATE_RISK_RATING:
          return {...state, getRiskRatingError:[]};
      case EDIT_RISK_RATING:
         return { ...state, getRiskRatingEditError: action.data };
      case RESET_EDIT_RISK_RATING:
        return { ...state, getRiskRatingEditError: [] };
      default:
        return state;
    }
  };
  export default RemitRiskRatingReducer;