import { Dispatch } from "redux";
import { Constants, ApiEndPoints } from "../../Constants/Constants";
import axios from "axios";

export const UPDATE_ONBEHALF_DETAILS = "UPDATE_ONBEHALF_DETAILS";
export const GET_FRONTIMG = "GET_FRONTIMG";
export const GET_BACKIMG = "GET_BACKIMG";

export const updateOnBehalfDetails = (data: any, id: any) => {
  return async (dispatch: Dispatch) => {
    const onBehalfSenderId = "/" + id;
    const apiURL =
      Constants.BaseURL + ApiEndPoints.updateOnBehalfDetails + onBehalfSenderId;

    try {
      const updateOnBehalfDetailsResponse = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateOnBehalfDetailsResponse) {
        dispatch({
          type: UPDATE_ONBEHALF_DETAILS,
          data: updateOnBehalfDetailsResponse,
        });
      }
    } catch (error) {}
  };
};

export const getOnBehalfFrontImage = (id: any) => {
  return async (dispatch: Dispatch) => {
    const onBehalfSenderId = "/" + id;
    const apiURL =
      Constants.BaseURL + ApiEndPoints.onBehalfFrontImage + onBehalfSenderId;

    try {
      const getOnBehalfFrontImageResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getOnBehalfFrontImageResponse) {
        dispatch({ type: GET_FRONTIMG, data: getOnBehalfFrontImageResponse });
      }
    } catch (error) {}
  };
};

export const getOnBehalfBackImage = (id: any) => {
  return async (dispatch: Dispatch) => {
    const onBehalfSenderId = "/" + id;
    const apiURL =
      Constants.BaseURL + ApiEndPoints.onBehalfBackImage + onBehalfSenderId;

    try {
      const getOnBehalfBackImageResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getOnBehalfBackImageResponse) {
        dispatch({ type: GET_BACKIMG, data: getOnBehalfBackImageResponse });
      }
    } catch (error) {}
  };
};
