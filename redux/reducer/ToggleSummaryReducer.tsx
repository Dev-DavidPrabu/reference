import { GET_TOGGLE_SUMMARY, RESET_UPDATE_TOGGLE_SUMMARY, UPDATE_TOGGLE_SUMMARY,
GET_ALL_TOGGLE_SUMMARY,RESET_GET_TOGGLE_SUMMARY, RESET_ALL_TOGGLE_SUMMARY } from "../action/ToggleSummaryAction";

const initialState = {
  getToggleSummaryList: [],
  getToggleSummaryUpdate:[],
};

const ToggleSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_TOGGLE_SUMMARY:
      return { ...state,getToggleSummaryList: action.data };
    case GET_ALL_TOGGLE_SUMMARY:
      return { ...state,getAllToggleSummaryList: action.data };
    case RESET_ALL_TOGGLE_SUMMARY:
      return { ...state,getAllToggleSummaryList:[]}  
    case RESET_GET_TOGGLE_SUMMARY:
      return { ...state,getToggleSummaryList: [] };
      case UPDATE_TOGGLE_SUMMARY:
      return { ...state,getToggleSummaryUpdate: action.data };
      case RESET_UPDATE_TOGGLE_SUMMARY:
      return { ...state,getToggleSummaryReset: action.data };
    default:
      return state;
  }
};
export default ToggleSummaryReducer;