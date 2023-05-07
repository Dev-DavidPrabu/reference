import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_NOTIFICATION_SUMMARY = "GET_NOTIFICATION_SUMMARY";
export const UPDATE_NOTIFICATION_SUMMARY = "UPDATE_NOTIFICATION_SUMMARY";
export const GET_NOTIFICATION_MODULE = "GET_NOTIFICATION_MODULE";

export const getNotificationData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.notificationList;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_NOTIFICATION_SUMMARY, data: getResponse });
      }
    } catch (error) {}
  };
};
export const updateGroupRight = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateNotification;
    try {
      const updateResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateResponse) {
        dispatch({ type: UPDATE_NOTIFICATION_SUMMARY, data: updateResponse });
      }
    } catch (error) {}
  };
};
export const getNotificationModuleData = (module: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.notificationListByModule + `/${module}`;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_NOTIFICATION_MODULE, data: getResponse });
      }
    } catch (error) {}
  };
};
