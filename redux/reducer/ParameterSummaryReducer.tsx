import { GET_PARAMETER_MODULE, GET_PARAMETER_SUMMARY, UPDATE_PARAMETER_SUMMARY,CLEAR_UPDATE_SUMMARY } from "../action/ParameterSummaryAction";

const initialState = {
  getParameterResponse: [],
  getParameterModuleResponse: [],
  updateParameterResponse: []
}


const ParameterSummaryReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_PARAMETER_SUMMARY:
      return { ...state, getParameterResponse: action.data };
    case GET_PARAMETER_MODULE:
      return { ...state, getParameterModuleResponse: action.data };
    case UPDATE_PARAMETER_SUMMARY:
      return { ...state, updateParameterResponse: action.data };
    case CLEAR_UPDATE_SUMMARY:
      return { ...state, updateParameterResponse: []}
    default:
      return state;
  }

}

export default ParameterSummaryReducer;