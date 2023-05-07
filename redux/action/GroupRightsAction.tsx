import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_GROUP_RIGHTS = "GET_GROUP_RIGHTS";
export const GET_GROUP_NAMES = "GET_GROUP_NAMES";
export const UPDATE_GROUP_DATA = "UPDATE_GROUP_DATA";
export const POST_GROUP_DATA = "POST_GROUP_DATA";
export const GET_GROUP_FUNTION_NAMES = "GET_GROUP_FUNTION_NAMES";
export const RESET_UPDATE_GROUPS_RIGHT = "RESET_UPDATE_GROUPS_RIGHT";
export const RESET_GROUPS_RIGHT = "RESET_GROUPS_RIGHT";
export const DELETE_GROUP_RIGHT = "DELETE_GROUP_RIGHT";
export const RESET_DELETE_GROUP_RIGHT = "RESET_DELETE_GROUP_RIGHT";

export const getGroupRightsData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.useGroupRightList;
    const getResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (getResponse) {
      dispatch({ type: GET_GROUP_RIGHTS, data: getResponse });
    }
  };
};

export const updateGroupRight = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.useGroupRightUpdate;
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
        dispatch({ type: UPDATE_GROUP_DATA, data: updateResponse });
      }
    } catch (error) {}
  };
};

export const createGroupRight = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.useGroupRightCreate;
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
        dispatch({ type: POST_GROUP_DATA, data: createResponse });
      }
    } catch (error) {}
  };
};

export const getAllGroupName = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userGroupList;
    try {
      const getAllGroup = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getAllGroup) {
        dispatch({ type: GET_GROUP_NAMES, data: getAllGroup });
      }
    } catch (error) {}
  };
};

export const getAllFuntionName = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.functionList;
    try {
      const getAllGroup = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getAllGroup) {
        dispatch({ type: GET_GROUP_FUNTION_NAMES, data: getAllGroup });
      }
    } catch (error) {}
  };
};

export const deleteGroupRight = (id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.useGroupRightDelete + `${id}`;
    try {
      const deleteGroup = await axios.post(apiURL, id).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (deleteGroup) {
        dispatch({ type: DELETE_GROUP_RIGHT, data: deleteGroup });
      }
    } catch (error) {}
  };
};

export const clearCreateGroupRight = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GROUPS_RIGHT });
  };
};

export const clearDeleteGroupRight = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_GROUP_RIGHT });
  };
};

export const clearUpdateGroupRight = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_GROUPS_RIGHT });
  };
};
