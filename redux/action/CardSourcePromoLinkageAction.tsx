import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_CARD_TYPE_PROMO_LIST = "GET_CARD_TYPE_PROMO_LIST";
export const RESET_CARD_TYPE_PROMO_LIST = "RESET_CARD_TYPE_PROMO_LIST";
export const GET_CARD_SOURCE_PROMO_LIST = "GET_CARD_SOURCE_PROMO_LIST";

export const getAllCardTypePromoCode = (promocode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getCardTypePromoCode + promocode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CARD_TYPE_PROMO_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCardTypePromoCode = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CARD_TYPE_PROMO_LIST });
  };
};

export const getCardSourcePromoList = (cardPromoData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.getCardSourcePromo;
      const response = await axios
        .post(apiURL, cardPromoData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_CARD_SOURCE_PROMO_LIST, data: response });
      }
    } catch (error) {}
  };
};
