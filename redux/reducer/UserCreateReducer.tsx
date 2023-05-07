import {
  POST_CREATE_DATA,
  GET_USER_DATA,
  RESET_CREATE_INFO,
  UPDATE_USER_DATA,
  RESET_UPDATE_INFO,
  GET_USER_BRANCH_LIST,
  POST_CREATE_DATA_STATUS,
} from "../action/UserCreateAction";

const initialState = {
  postUserDataResponse: [],
  getUserDataResponse: [],
  updateUserDataResponse: [],
  createApiStatus: "",
};

const UserCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_CREATE_DATA:
      return { ...state, postUserDataResponse: action.data };
    case POST_CREATE_DATA_STATUS:
      return { ...state, createApiStatus: action.data };
    case RESET_CREATE_INFO:
      return { ...state, postUserDataResponse: [] };
    case GET_USER_DATA:
      return { ...state, getUserDataResponse: action.data };
    case GET_USER_BRANCH_LIST:
      return { ...state, getUserBranchResponseList: action.data };
    case UPDATE_USER_DATA:
      return { ...state, updateUserDataResponse: action.data };
    case RESET_UPDATE_INFO:
      return { ...state, updateUserDataResponse: [] };
    default:
      return state;
  }
};
export default UserCreateReducer;
