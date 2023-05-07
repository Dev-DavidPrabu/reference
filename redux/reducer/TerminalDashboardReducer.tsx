import {
  GET_TERMINAL_DASHBOARD_LIST,
  CREATE_TERMINAL_DASHBOARD,
  RESET_CREATE_TERMINAL_ERROR,
  EDIT_TERMINAL_DASHBOARD,
  RESET_EDIT_TERMINAL_ERROR,
  GET_TERMINAL_DEVICE_LIST,
  APPROVE_TERMINAL_STATUS_RESPONSE,
  REJECT_TERMINAL_STATUS_RESPONSE,
  UPDATE_TERMINAL_DASHBOARD_DETAILS,
  ACTIVATE_TERMINAL_RESPONSE,
  RESET_UPDATE_TERMINAL_DASHBOARD_DETAILS,
  DEACTIVATE_TERMINAL_STATUS_RESPONSE,
  RESET_TERMINAL_DASHBOARD_LIST
} from "../action/TerminalDashboardAction";

const initialState = {
  getAllTerminalResponse: [],
  getAllDeviceResponse: [],
  getTerminalCreateError: [],

  getTerminalEditError: [],
};

const TerminalDashboardReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_TERMINAL_DASHBOARD_LIST:
      return { ...state, getAllTerminalResponse: action.data };
    case GET_TERMINAL_DEVICE_LIST:
      return { ...state, getAllDeviceResponse: action.data };
    case CREATE_TERMINAL_DASHBOARD:
      return { ...state, getTerminalCreateError: action.data };
    case APPROVE_TERMINAL_STATUS_RESPONSE:
      return { ...state, getTerminalApprove: action.data };
    case REJECT_TERMINAL_STATUS_RESPONSE:
      return { ...state, getTerminalreject: action.data };
    case RESET_CREATE_TERMINAL_ERROR:
      return { ...state, getTerminalCreateError: [] };

    case EDIT_TERMINAL_DASHBOARD:
      return { ...state, getTerminalEditError: action.data };
    case RESET_EDIT_TERMINAL_ERROR:
      return { ...state, getTerminalEditError: [] };
    case UPDATE_TERMINAL_DASHBOARD_DETAILS:
      return { ...state, getUpdatedTerminal: action.data };
    case RESET_UPDATE_TERMINAL_DASHBOARD_DETAILS:
      return { ...state, getUpdatedTerminal: [] };
    case ACTIVATE_TERMINAL_RESPONSE:
      return { ...state, activateTerminalResponse: action.data };
    case DEACTIVATE_TERMINAL_STATUS_RESPONSE:
      return { ...state, deactivateTerminalResponse: action.data };
    case RESET_TERMINAL_DASHBOARD_LIST:
      return { ...state, getAllTerminalResponse:[]};
    default:
      return state;
  }
};
export default TerminalDashboardReducer;
