import {
  DELETE_IDTYPE_SUMMARY_DATA,
  GET_IDTYPE_CODE_RES,
  GET_IDTYPE_DATA_RES,
  POST_IDTYPE_SUMMARY,
  RESET_CREATED_DATA,
  RESET_DELETE_IDTYPE_DATA,
  RESET_FILTER_DATA,
  RESET_UPDATED_DATA,
  UPDATE_IDTYPE_SUMMARY,
} from "../action/IdTypeSummaryAction";

const initialState = {
  getAllIdtypeCodeResponse: [],
  postIdtypeSummaryResponse: [],
  updateIdtypeSummaryResponse: [],
  deleteIdtypeSummaryResponse: [],
};

const idtypeSummaryReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_IDTYPE_DATA_RES:
      return { ...state, getAllIdtypeSummaryResponse: action.data };
    case GET_IDTYPE_CODE_RES:
      return { ...state, getAllIdtypeCodeResponse: action.data };
    case RESET_FILTER_DATA:
      return { ...state, getAllIdtypeCodeResponse: [] };
    case RESET_CREATED_DATA:
      return { ...state, postIdtypeSummaryResponse: [] };
    case RESET_UPDATED_DATA:
      return { ...state, updateIdtypeSummaryResponse: [] };
    case POST_IDTYPE_SUMMARY:
      return { ...state, postIdtypeSummaryResponse: action.data };
    case UPDATE_IDTYPE_SUMMARY:
      return { ...state, updateIdtypeSummaryResponse: action.data };
    case DELETE_IDTYPE_SUMMARY_DATA:
      return { ...state, deleteIdtypeSummaryResponse: action.data };
    case RESET_DELETE_IDTYPE_DATA:
      return { ...state, deleteIdtypeSummaryResponse: [] };
    default:
      return state;
  }
};
export default idtypeSummaryReducer;
