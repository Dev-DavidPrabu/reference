import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const ADD_NEW_USER_GROUP = "ADD_NEW_USER_GROUP";
export const GET_USER_GROUP_DATA = "GET_USER_GROUP_DATA";
export const EDIT_USER_GROUP_DATA = "EDIT_USER_GROUP_DATA ";
export const DELETE_USER_GROUP = "DELETE_USER_GROUP";
export const RESET_CREATED_GROUP_INFO = "RESET_CREATED_GROUP_INFO";
export const RESET_UPDATE_GROUP_INFO = "RESET_UPDATE_GROUP_INFO";
export const RESET_DELETE_GROUP_INFO = "RESET_DELETE_GROUP_INFO";

export const getAllUserGroupData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userGroupList;
    try {
      const createGroupResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (createGroupResponse) {
        dispatch({ type: GET_USER_GROUP_DATA, data: createGroupResponse });
      }
    } catch (error) {}
  };
};

export const addNewUserGroup = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userGroupSave;
    try {
      const createNewGroupResponse = await axios
        .post(apiURL, apiBody)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (createNewGroupResponse) {
        dispatch({ type: ADD_NEW_USER_GROUP, data: createNewGroupResponse });
      }
    } catch (error) {}
  };
};
export const deleteUserGroupOne = (id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userGroupDelete + `${id}`;
    try {
      const deleteUserGroupResponse = await axios
        .post(apiURL, id)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (deleteUserGroupResponse) {
        dispatch({ type: DELETE_USER_GROUP, data: deleteUserGroupResponse });
      }
    } catch (error) {}
  };
};

export const resetDeleteGroupInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_GROUP_INFO });
  };
};

export const updateUserGroup = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userGroupUpdate;
    try {
      const updateGroupResponse = await axios
        .post(apiURL, apiBody)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateGroupResponse) {
        dispatch({ type: EDIT_USER_GROUP_DATA, data: updateGroupResponse });
      }
    } catch (error) {}
  };
};

export const resetCreateGroupInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_GROUP_INFO });
    dispatch({ type: RESET_UPDATE_GROUP_INFO });
  };
};
