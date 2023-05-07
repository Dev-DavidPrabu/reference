import {
    GET_CARD_TYPE_LIST,
  } from "../action/CardTypeAction";

  
  const initialState = {
    getCardTypeList: [],
  };
  
  const CardTypeReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CARD_TYPE_LIST:
        return { ...state, getCardTypeList: action.data };
      default:
        return state;
    }
  };
  export default CardTypeReducer;