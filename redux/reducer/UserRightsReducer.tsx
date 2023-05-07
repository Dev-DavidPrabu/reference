import {
  CREATE_USER_RIGHT,
  DELETE_USER_RIGHT,
  GET_USER_RIGHTS,
  RESET_CREATE_RIGHT,
  RESET_UPDATE_RIGHT,
  UPDATE_USER_RIGHT,
  RESET_DELETE_USER_RIGHT,
  GET_USER_RIGHTS_FULLNAME,
  RESET_USER_RIGHTS_FULLNAME,
} from "../action/UserRightsAction";

const initialState = {
  getUserRightsResponse: [],
  postUserRightsResponse: [],
  createUserRightResponse: [],
  deleteUserRightResponse: [],
  getUserRightsFullName: [],
};

const UserRightsReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_USER_RIGHTS:
      return { ...state, getUserRightsResponse: action.data };
    case GET_USER_RIGHTS_FULLNAME:
      return { ...state, getUserRightsFullName: action.data };
    case RESET_USER_RIGHTS_FULLNAME:
      return { ...state, getUserRightsFullName: [] };
    case UPDATE_USER_RIGHT:
      return { ...state, postUserRightsResponse: action.data };
    case CREATE_USER_RIGHT:
      return { ...state, createUserRightResponse: action.data };
    case RESET_CREATE_RIGHT:
      return { ...state, createUserRightResponse: [] };
    case RESET_UPDATE_RIGHT:
      return { ...state, postUserRightsResponse: [] };
    case DELETE_USER_RIGHT:
      return { ...state, deleteUserRightResponse: action.data };
    case RESET_DELETE_USER_RIGHT:
      return { ...state, deleteUserRightResponse: [] };
    default:
      return state;
  }
};
export default UserRightsReducer;
