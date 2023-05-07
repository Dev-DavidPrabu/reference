import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";
export const GET_ALL_META_DATA = "GET_ALL_META_DATA";

export const getAllMetaData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.metaDataList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_META_DATA, data: response.data });
      }
    } catch (error) {}
  };
};
