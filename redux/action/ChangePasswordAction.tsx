import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const CHANGE_NEW_PASSWORD = "CHANGE_NEW_PASSWORD";
export const CHANGE_PROFILE_DETAIL = "CHANGE_PROFILE_DETAIL";
export const DETAIL_RESPONSE = "DETAIL_RESPONSE";
export const RESET_CHANGE_PROFILE_DETAIL = "RESET_CHANGE_PROFILE_DETAIL";

export const ChangePassword = (addDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.changeNewPasswordData;
    try {
      const changePasswordRes = await axios
        .post(apiURL, addDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (changePasswordRes) {
        dispatch({ type: CHANGE_NEW_PASSWORD, data: changePasswordRes });
      }
    } catch (error) {}
  };
};

export const ChangeProfile = (profileName: any, profileDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.changeProfileData +
      `?userName=${profileName}`;
    var profileData = new FormData();
    profileData.append("profilePicture", profileDetails[0]);
    try {
      const changeProfileRes = await axios
        .post(apiURL, profileData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });

      if (changeProfileRes) {
        dispatch({ type: CHANGE_PROFILE_DETAIL, data: changeProfileRes });
      }
    } catch (error) {}
  };
};

export const resetChangeProfile = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CHANGE_PROFILE_DETAIL });
  };
};

export const detailResponse = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.gettingLoggedInUserInfo;
    try {
      const detailRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (detailRes) {
        dispatch({ type: DETAIL_RESPONSE, data: detailRes });
      }
    } catch (error) {}
  };
};
