import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_GLOBAL_SETTINGS = "GET_GLOBAL_SETTINGS";
export const EDIT_GLOBAL_SETTINGS_RES = "EDIT_GLOBAL_SETTINGS_RES";

export const getGlobalSettingsData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.globalSettings;
    try {
      const globalSettingsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (globalSettingsResponse) {
        dispatch({ type: GET_GLOBAL_SETTINGS, data: globalSettingsResponse });
      }
    } catch (error) {}
  };
};

export const editGlobalSettingsData = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.UpdateGlobalSettings;
    try {
      const approveUnBlockStatusRes = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveUnBlockStatusRes) {
        dispatch({
          type: EDIT_GLOBAL_SETTINGS_RES,
          data: approveUnBlockStatusRes,
        });
      }
    } catch (error) {}
  };
};
