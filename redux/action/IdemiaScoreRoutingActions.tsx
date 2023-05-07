import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_IDEMIA_SCORE_ROUTING = " GET_IDEMIA_SCORE_ROUTING";
export const UPDATE_IDEMIA_SCORE_ROUTING = "UPDATE_IDEMIA_SCORE_ROUTING";

export const getIdemiaScoreRoutingList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.idemiaScoreList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDEMIA_SCORE_ROUTING, data: response.data });
      }
    } catch (error) {}
  };
};

export const idemiaScoreRoutingUpdate = (updateIdemiaScore: Fields) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.idemiaScoreUpdate;
      await axios.post(apiURL, updateIdemiaScore);
      window.location.reload();
    } catch (error) {}
  };
};
