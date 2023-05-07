import {
    GET_AGENT_GROUP_LIST,
    CREATE_AGENT_GROUP,
    RESET_CREATE_ERROR,
    RESET_DELETE_AGENT,
    DELETE_AGENT_GROUP,
    EDIT_AGENT_GROUP,
    RESET_EDIT_ERROR
  } from "../action/AgentGroupAction";
  
  const initialState = {
    getAllAgentGroupListResponse: [],
    getAgentGroupCreateError:[],
    getDeleteAgent:[],
    getAgentGroupEditError:[],
  };
  
  const AgentGroupReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_AGENT_GROUP_LIST:
        return { ...state, getAllAgentGroupListResponse: action.data };
      case CREATE_AGENT_GROUP:
          return { ...state, getAgentGroupCreateError: action.data };
      case RESET_CREATE_ERROR:
          return {...state, getAgentGroupCreateError:[]};
      case DELETE_AGENT_GROUP:
          return { ...state, getDeleteAgent: action.data };
      case RESET_DELETE_AGENT:
        return { ...state, getDeleteAgent:[]};
      case EDIT_AGENT_GROUP:
        return { ...state, getAgentGroupEditError: action.data };
      case RESET_EDIT_ERROR:
        return { ...state, getAgentGroupEditError:[]};
      default:
        return state;
    }
  };
  export default AgentGroupReducer;
  