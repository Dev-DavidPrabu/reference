import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_USER_RIGHTS = "GET_USER_RIGHTS";
export const CREATE_USER_RIGHT = "CREATE_USER_RIGHT";
export const UPDATE_USER_RIGHT = "UPDATE_USER_RIGHT";
export const RESET_CREATE_RIGHT = "RESET_CREATE_RIGHT";
export const RESET_UPDATE_RIGHT = "RESET_UPDATE_RIGHT";
export const DELETE_USER_RIGHT = "DELETE_USER_RIGHT";
export const RESET_DELETE_USER_RIGHT = "RESET_DELETE_USER_RIGHT";
export const GET_USER_RIGHTS_FULLNAME = "GET_USER_RIGHTS_FULLNAME";
export const RESET_USER_RIGHTS_FULLNAME = "RESET_USER_RIGHTS_FULLNAME";

export const getUserRightsData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userRightsList;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_USER_RIGHTS, data: getResponse });
      }
    } catch (error) {}
  };
};
export const getUserRightsFullName = (id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getgroupRightFullName + `${id}`;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_USER_RIGHTS_FULLNAME, data: getResponse });
      }
    } catch (error) {}
  };
};
export const createUserRight = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userRightsCreate;
    try {
      const createResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (createResponse) {
        dispatch({ type: CREATE_USER_RIGHT, data: createResponse });
      }
    } catch (error) {}
  };
};
export const clearCreateInfoRight = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_RIGHT });
  };
};
export const clearFullNameInfoRight = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_USER_RIGHTS_FULLNAME });
  };
};

export const clearUpdateInfoRights = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_RIGHT });
  };
};

export const clearDeleteInfoRights = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_USER_RIGHT });
  };
};

export const updateUserRight = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userRightsUpdate;
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
        dispatch({ type: UPDATE_USER_RIGHT, data: updateResponse });
      }
    } catch (error) {}
  };
};

export const deleteUserRight = (userData: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.userRightsDelete + `${userData}`;
    try {
      const deleteResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (deleteResponse) {
        dispatch({ type: DELETE_USER_RIGHT, data: deleteResponse });
      }
    } catch (error) {}
  };
};
