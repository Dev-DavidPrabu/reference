import {
    GET_CARD_PROMO_CODE_LIST,
  } from "../action/CardPromoCodeAction";

  
  const initialState = {
    getCardPromoCodeList: [],
  };
  
  const CardPromoCodeReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CARD_PROMO_CODE_LIST:
        return { ...state, getCardPromoCodeList: action.data };
      default:
        return state;
    }
  };
  export default CardPromoCodeReducer;