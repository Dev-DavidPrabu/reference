import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_APPROVAL_TASK = "GET_APPROVAL_TASK";
export const POST_APPROVAL_TASK = "POST_APPROVAL_TASK";
export const GET_APPROVALID_TASK = "GET_APPROVALID_TASK";
export const DELETE_APPOVAL_TASK = "DELETE_APPOVAL_TASK";

export const getApprovalTaskData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getapproval;
    try {
      let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

      const getResponse = await axios
        .post(apiURL, null, {
          headers: {
            "x-session-id": userData.sessionId,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_APPROVAL_TASK, data: getResponse });
      }
    } catch (error) {}
  };
};
export const ApprovalTaskData = (approvalTaskData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.approvalTask;

    try {
      let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const getResponse = await axios
        .post(apiURL, approvalTaskData, {
          headers: {
            "x-session-id": userData.sessionId,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: POST_APPROVAL_TASK, data: getResponse });
      }
    } catch (error) {}
  };
};
export const getApprovalTaskIdData = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.viewapprovalTaskid + id;
    try {
      let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const getResponse = await axios
        .get(apiURL, {
          headers: {
            "x-session-id": userData.sessionId,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_APPROVALID_TASK, data: getResponse });
      }
    } catch (error) {}
  };
};
export const rejectApprovalTaskData = (record: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.taskReject;

    try {
      let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const getResponse = await axios
        .post(apiURL, record, {
          headers: {
            "x-session-id": userData.sessionId,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: DELETE_APPOVAL_TASK, data: getResponse });
      }
    } catch (error) {}
  };
};
