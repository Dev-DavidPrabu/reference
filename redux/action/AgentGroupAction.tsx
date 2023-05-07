import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import {
  AgentGroupFilterModel,
  CreateAgentGroupModel,
  UpdateAgentGroupModel,
} from "../../models/AgentGroupModel";
import axios from "axios";

export const GET_AGENT_GROUP_LIST = "GET_AGENT_GROUP_LIST";
export const CREATE_AGENT_GROUP = "CREATE_AGENT_GROUP";
export const RESET_CREATE_ERROR = "RESET_CREATE_ERROR";
export const DELETE_AGENT_GROUP = "DELETE_AGENT_GROUP";
export const RESET_DELETE_AGENT = "RESET_DELETE_AGENT";
export const EDIT_AGENT_GROUP = "EDIT_AGENT_GROUP";
export const RESET_EDIT_ERROR = "RESET_EDIT_ERROR";

export const getAgentGroup = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAgentGroupList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_AGENT_GROUP_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getAgentGroupFilter = (
  addAgentGroupFilter: AgentGroupFilterModel
) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.agentGroupFilter;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            agentGroupName: addAgentGroupFilter?.agentGroupName,
            agentGroupCode: addAgentGroupFilter?.agentGroupCode,
            status: addAgentGroupFilter?.status,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_AGENT_GROUP_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_ERROR });
  };
};

export const createAgentGroup = (createId: CreateAgentGroupModel) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createAgentGroup;
      const response = await axios.post(apiURL, createId).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_AGENT_GROUP, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_ERROR });
  };
};

export const updateAgentGroup = (EditAgentGroup: UpdateAgentGroupModel) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.editAgentGroup;
      const response = await axios
        .post(apiURL, EditAgentGroup)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: EDIT_AGENT_GROUP, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteAgentGroup = (AgentCode: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deleteAgentGroup;
      const response = await axios
        .post(apiURL, null, {
          params: {
            agentGroupCode: AgentCode,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: DELETE_AGENT_GROUP, data: response });
        if (response.data) {
        }
      }
    } catch (error) {}
  };
};

export const resetDeleteAgent = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_AGENT });
  };
};
