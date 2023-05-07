import {
    GET_CARD_SOURCE_CODE_LIST,
  } from "../action/CardSourceCodeAction";

  
  const initialState = {
    getCardSourceCodeList: [],
  };
  
  const CardSourceCodeReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CARD_SOURCE_CODE_LIST:
        return { ...state, getCardSourceCodeList: action.data };
      default:
        return state;
    }
  };
  export default CardSourceCodeReducer;