import {GET_GROUP_RIGHTS , POST_GROUP_DATA, UPDATE_GROUP_DATA, GET_GROUP_NAMES , GET_GROUP_FUNTION_NAMES , RESET_GROUPS_RIGHT, RESET_UPDATE_GROUPS_RIGHT, DELETE_GROUP_RIGHT, RESET_DELETE_GROUP_RIGHT} from '../action/GroupRightsAction';
const initialState = {
    getGroupRightsResponse: [],
    postGroupRightsResponse: [],
    updateGroupRightsResponse: [],
    getAllGroupNames: [],
    getAllGroupFuntion: [],
    deleteGroupRights: []
  };



  const GroupRightsReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_GROUP_RIGHTS:
          return { ...state, getGroupRightsResponse: action.data };
        case POST_GROUP_DATA:
          return { ...state, postGroupRightsResponse: action.data };
        case RESET_GROUPS_RIGHT:
          return { ...state, postGroupRightsResponse: [] };
        case UPDATE_GROUP_DATA:
          return { ...state, updateGroupRightsResponse: action.data };
        case RESET_UPDATE_GROUPS_RIGHT:
          return { ...state, updateGroupRightsResponse: [] };
        case GET_GROUP_NAMES:
          return { ...state, getAllGroupNames: action.data };
        case GET_GROUP_FUNTION_NAMES:
          return { ...state, getAllGroupFuntion: action.data };
        case DELETE_GROUP_RIGHT:
          return { ...state, deleteGroupRights: action.data}
        case RESET_DELETE_GROUP_RIGHT:
          return { ...state, deleteGroupRights: []}
        default:
          return state;
      }

  }

  export default GroupRightsReducer;