import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_BRANCH_DASHBOARD_REGORDS_DATA =
  "GET_BRANCH_DASHBOARD_REGORDS_DATA";
export const POST_NEW_BRANCH = "POST_NEW_BRANCH";
export const RESET_CREATED_BRANCH = "RESET_CREATED_BRANCH";
export const GET_BRANCH_DASHBOARD_FILTER = "GET_BRANCH_DASHBOARD_FILTER";
export const UPDATE_BRANCH_DATA = "UPDATE_BRANCH_DATA";
export const DELETE_BRANCH_DATA = "DELETE_BRANCH_DATA";
export const RESET_DELETE_BRANCH_DATA = "RESET_DELETE_BRANCH_DATA";
export const RESET_UPDATE_BRANCH_DATA = "RESET_UPDATE_BRANCH_DATA";
export const RESET_BRANCH_DASHBOARD_FILTER="RESET_BRANCH_DASHBOARD_FILTER"

export const getBranchDashboardRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBranchDashboardList;

    try {
      const branchDashboardRegordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (branchDashboardRegordsResponse) {
        dispatch({
          type: GET_BRANCH_DASHBOARD_REGORDS_DATA,
          data: branchDashboardRegordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const getBranchDashboardFilter = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getBranchDashboardFilter +
      `?branchName=${data.branchName}&branchCode=${data.branchCode}&agentGroupName=${data.agentGroupName}&mid=${data.mid}&status=${data.status}`;

    try {
      const branchDashboardFilterResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (branchDashboardFilterResponse) {
        dispatch({
          type: GET_BRANCH_DASHBOARD_REGORDS_DATA,
          data: branchDashboardFilterResponse,
        });
      }
    } catch (error) {}
  };
};

export const postNewBranch = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addBranch;
    try {
      const response = await axios.post(apiURL, apiBody).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: POST_NEW_BRANCH, data: response });
      }
    } catch (error) {}
  };
};

export const updateBranchData = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateBranch;
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: UPDATE_BRANCH_DATA, data: response });
  };
};

export const resetUpdatebranchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_BRANCH_DATA });
  };
};

export const deleteBranchData = (branchCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.deleteBranch + branchCode;

    const response = await axios.post(apiURL).then((response) => {
      return response.data;
    });
    dispatch({ type: DELETE_BRANCH_DATA, data: response });
  };
};

export const restDeletebranchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_BRANCH_DATA });
  };
};

export const restCreatedBranch = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_BRANCH });
  };
};

export const resetBranchDashboard = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_BRANCH });
  };
};


