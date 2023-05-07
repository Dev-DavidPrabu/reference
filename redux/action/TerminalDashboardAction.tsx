import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_TERMINAL_DASHBOARD_LIST = "GET_TERMINAL_DASHBOARD_LIST";
export const GET_TERMINAL_DEVICE_LIST = "GET_TERMINAL_DEVICE_LIST";
export const CREATE_TERMINAL_DASHBOARD = "CREATE_TERMINAL_DASHBOARD";
export const RESET_CREATE_TERMINAL_ERROR = "RESET_CREATE_TERMINAL_ERROR";
export const DELETE_TERMINAL_DASHBOARD = "DELETE_TERMINAL_DASHBOARD";
export const RESET_DELETE_AGENT = "RESET_DELETE_AGENT";
export const EDIT_TERMINAL_DASHBOARD = "EDIT_TERMINAL_DASHBOARD";
export const RESET_EDIT_TERMINAL_ERROR = "RESET_EDIT_TERMINAL_ERROR";
export const APPROVE_TERMINAL_STATUS_RESPONSE =
  "APPROVE_TERMINAL_STATUS_RESPONSE";
export const REJECT_TERMINAL_STATUS_RESPONSE =
  "REJECT_TERMINAL_STATUS_RESPONSE";
export const UPDATE_TERMINAL_DASHBOARD_DETAILS =
  "UPDATE_TERMINAL_DASHBOARD_DETAILS";
export const ACTIVATE_TERMINAL_RESPONSE = "ACTIVATE_TERMINAL_RESPONSE";
export const RESET_UPDATE_TERMINAL_DASHBOARD_DETAILS =
  "RESET_UPDATE_TERMINAL_DASHBOARD_DETAILS";
export const DEACTIVATE_TERMINAL_STATUS_RESPONSE =
  "DEACTIVATE_TERMINAL_STATUS_RESPONSE";
export const RESET_TERMINAL_DASHBOARD_LIST = "RESET_TERMINAL_DASHBOARD_LIST";



export const getTerminalList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getTerminalDashboardList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_TERMINAL_DASHBOARD_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getTerminalFilter = (terminalFilter: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getTerminalDashboardFilter;
    try {
      const checkParams=()=>{
        const params={
          agentGrpCode: terminalFilter?.agentGrpCode,
          branchCode: terminalFilter?.branchCode,
          mid: terminalFilter?.mid,
          status: terminalFilter?.status,
          tid: terminalFilter?.tid,
        }
        let newParams = {};
        for (const [key, value] of Object.entries(params)) {
            if(value){
              newParams = {
                ...newParams,
                [key]:value
              }
            }
        }
        return newParams
      }

      let newParams=checkParams();

     
      const response = await axios
        .get(apiURL, {
          params:newParams
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_TERMINAL_DASHBOARD_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getDeviceList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.terminalDeviceList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_TERMINAL_DEVICE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_TERMINAL_ERROR });
  };
};

export const createTerminalDashboard = (createId: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createTerminal;
      const response = await axios.post(apiURL, createId).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_TERMINAL_DASHBOARD, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteTerminalGroup = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL +
        ApiEndPoints.terimnalDeactivate +
        `?eTerminalId=${id}`;
      const deactivateTerminalStatusRes = await axios
        .post(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (deactivateTerminalStatusRes) {
        dispatch({
          type: DEACTIVATE_TERMINAL_STATUS_RESPONSE,
          data: deactivateTerminalStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const approveTerminal = (id: any, value: any, reason: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.approveTerminal +
      `${value}` +
      `?eTerminalId=${id}&reason=${reason}`;
    try {
      const approveTerminalStatusRes = await axios
        .post(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveTerminalStatusRes) {
        dispatch({
          type: APPROVE_TERMINAL_STATUS_RESPONSE,
          data: approveTerminalStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const rejectTerminal = (id: any, value: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.approveTerminal +
      `${value}` +
      `?eTerminalId=${id}`;
    try {
      const rejectTerminalStatusRes = await axios
        .post(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (rejectTerminalStatusRes) {
        dispatch({
          type: REJECT_TERMINAL_STATUS_RESPONSE,
          data: rejectTerminalStatusRes,
        });
      }
    } catch (error) {}
  };
};

export const updateTerminalDashboard = (details: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateTerminal;
    try {
      const updateDetaillResponse = await axios
        .post(apiURL, details)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateDetaillResponse) {
        dispatch({
          type: UPDATE_TERMINAL_DASHBOARD_DETAILS,
          data: updateDetaillResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetupdateTerminalDashboard = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_TERMINAL_DASHBOARD_DETAILS });
  };
};

export const activateTerminalRes = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL +
        ApiEndPoints.terimnalActivate +
        `?eTerminalId=${id}`;
      const activeResponse = await axios.post(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (activeResponse) {
        dispatch({ type: ACTIVATE_TERMINAL_RESPONSE, data: activeResponse });
      }
    } catch (error) {}
  };
};

export const resetTerminalDashboard = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TERMINAL_DASHBOARD_LIST});
  };
};

