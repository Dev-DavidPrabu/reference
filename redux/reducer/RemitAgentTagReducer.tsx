import {
  GET_PAY_GROUP_DATA,
  RESET_PAYING_GROUP_DATA,
  RESET_UPDATE_PAY_GROUP,
  UPDATE_PAYING_GROUP_RECORDS_DATA,
} from "../action/RemitAgentTagAction";

const initialState = {
  getPayGroupRegordsResponse: [],
  updatePayGroupRecordsResponse: [],
};

const RemitAgentTagReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_PAY_GROUP_DATA:
      return { ...state, getPayGroupRegordsResponse: action.data };
    case UPDATE_PAYING_GROUP_RECORDS_DATA:
      return { ...state, updatePayGroupRecordsResponse: action.data };
    case RESET_UPDATE_PAY_GROUP:
      return { ...state, updatePayGroupRecordsResponse: [] };
    case RESET_PAYING_GROUP_DATA:
      return { ...state, getPayGroupRegordsResponse: [] };
    default:
      return state;
  }
};
export default RemitAgentTagReducer;
