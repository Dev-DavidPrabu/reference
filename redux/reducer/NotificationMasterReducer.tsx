import {
  GET_ALL_MASTER_DATA,
  EDIT_MASTER_DATA,
  CLEAR_EDIT_MASTER_DATA,
  CLEAR_ALL_MASTER_DATA
} from "../action//NotificationMasterAction";


const initialState = {
  getMasterResponse: [],
  updateMasterResponse: []
};

const NotificationMasterReducer = (state = initialState, action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ALL_MASTER_DATA:
      return { ...state, getMasterResponse: action.data };
    case CLEAR_ALL_MASTER_DATA:
      return { ...state, getMasterResponse: []};
    case EDIT_MASTER_DATA:
      return { ...state, updateMasterResponse: action.data };
    case CLEAR_EDIT_MASTER_DATA:
      return { ...state, updateMasterResponse: [] };
    default:
      return state;
  }
};
export default NotificationMasterReducer;
