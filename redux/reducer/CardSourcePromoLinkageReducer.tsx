import {
    GET_CARD_SOURCE_PROMO_LIST,
    GET_CARD_TYPE_PROMO_LIST,
    RESET_CARD_TYPE_PROMO_LIST
  } from "../action/CardSourcePromoLinkageAction";

  
  const initialState = {
    getCardSourcePromoList: [],
    getCardPromoList:[],
  };
  
  const CardSourcePromoLinkageReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CARD_TYPE_PROMO_LIST:
        return { ...state, getCardPromoList: action.data };
      case RESET_CARD_TYPE_PROMO_LIST:
        return { ...state, getCardPromoList:[] };
      case GET_CARD_SOURCE_PROMO_LIST:
        return { ...state, getCardSourcePromoList: action.data };
      default:
        return state;
    }
  };
  export default CardSourcePromoLinkageReducer;