import {
    GET_EXCHANGE_RATE_LIST,
    RESET_EXCHANGE_RATE_LIST,
    UPDATE_EXCHANGE_RATE,
    RESET_UPDATE_EXCHANGE_RATE,
  } from "../action/ExchangeRateAction";

  
  const initialState = {
    getAllExchangeRateList: [],
    getExchangeRateError:[],
  };
  
  const ExchangeRateReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_EXCHANGE_RATE_LIST:
        return { ...state, getAllExchangeRateList: action.data };
      case RESET_EXCHANGE_RATE_LIST:
        return { ...state, getAllExchangeRateList: []};
      case UPDATE_EXCHANGE_RATE:
          return { ...state, getExchangeRateError: action.data };
      case RESET_UPDATE_EXCHANGE_RATE:
          return {...state, getExchangeRateError:[]};
      default:
        return state;
    }
  };
  export default ExchangeRateReducer;