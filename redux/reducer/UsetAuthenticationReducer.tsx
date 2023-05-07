import {
  USER_LOGIN,
  RESET_LOGIN_INFO,
  GET_LOGGED_IN_USER_INFO,
  LOGIN_ERROR,
  GET_USERACCESS_INFO,
  RESET_USER_LOGIN,
  RESET_LOGGED_IN_USER_INFO,
  LOGOUT_USER_RESPONSE
} from "../action/UserAuthenticationAction";

const initialState = {
  authenticaticatedUserInfo: {},
  loggedInUserInfo: {},
  logginerror: {},
  userAccessInfo: [],
};

const authenticationReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        logginerror: {},
        authenticaticatedUserInfo: action.data,
      };
      case RESET_USER_LOGIN:
      return { ...state, authenticaticatedUserInfo: [] }
    case RESET_LOGIN_INFO:
      return { ...state, logginerror: {}, authenticaticatedUserInfo: {}, userAccessInfo: [] };
    case GET_LOGGED_IN_USER_INFO:
      return { ...state, logginerror: {}, loggedInUserInfo: action.data };
    case RESET_LOGGED_IN_USER_INFO:
      return { ...state, loggedInUserInfo:[]}
    case LOGIN_ERROR:
      return { ...state, logginerror: action.data };
    case GET_USERACCESS_INFO:
      return { ...state, userAccessInfo: action.data };
    case LOGOUT_USER_RESPONSE:
      return { ...state,logoutResponse:action.data}  
    default:
      return state;
  }
};

export default authenticationReducer;
