import { GET_IDEMIA_SCORE_ROUTING } from "../action/IdemiaScoreRoutingActions";

const initialState = {
  getIdemiaScoreRoutingList: [],
};

const IdemiaScoreRoutingReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_IDEMIA_SCORE_ROUTING:
      return { ...state,getIdemiaScoreRoutingList: action.data };
    default:
      return state;
  }
};
export default IdemiaScoreRoutingReducer;