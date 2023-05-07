import { GET_USER_GROUP_DATA,
  ADD_NEW_USER_GROUP,
  EDIT_USER_GROUP_DATA,
  DELETE_USER_GROUP,
  RESET_CREATED_GROUP_INFO,
  RESET_UPDATE_GROUP_INFO,
  RESET_DELETE_GROUP_INFO} from "../action/UserGroupAction";


const initialState = {

};

const UserGroupCreateReducer = (state = initialState,action: { type: string; data: any }
) => {
  switch (action.type) {
    case ADD_NEW_USER_GROUP:
      return { ...state, createUserGroupDataResponse: action.data };
    case GET_USER_GROUP_DATA:
      return { ...state, getUserGroupDataResponse: action.data };
    case DELETE_USER_GROUP:
      return{...state,deleteUserGroupDataResponse: action.data };
    case EDIT_USER_GROUP_DATA:
      return{...state,updateUserGroupDataResponse: action.data};
    case RESET_CREATED_GROUP_INFO:
      return{...state,createUserGroupDataResponse: []}  
    case RESET_UPDATE_GROUP_INFO:
      return {...state, updateUserGroupDataResponse: []};
    case RESET_DELETE_GROUP_INFO:
      return {...state, deleteUserGroupDataResponse: []}  
    default:
      return state;
  }
};
export default UserGroupCreateReducer;
