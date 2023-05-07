import {
  ADD_BLOCK_CARD_DETAILS,
  CUSTOMER_UNBLOCK_CARD_DETAILS,
  APPROVE_BLOCK_STATUS_RESPONSE,
  CUSTOMER_BLOCK_CARD_DETAILS,
  GET_BLOCK_CARD_RECORDS_DATA,
  GET_TOGGLE_RESPONSE_RECORDS_DATA,
  REJECT_BLOCK_CARD_STATUS_RESPONSE,
  RESET_GET_CUSTOMER_DETAIL,
  RESET_GET_TOGGLE_DETAIL,
  UPDATE_BLOCK_CARD_REQUEST_DATA,
  VERIFY_BLOCK_MOBILENO_DETAILS,
  RESPONSE_MESSAGE,
} from "../action/BlockCardRequestAction";

const initialState = {
  getBlockCardRequestResponse: [],
  customerDetailResponse: [],
  getUnblockCardRequestResponse: [],
};

const BlockCardRequestReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_BLOCK_CARD_RECORDS_DATA:
      return { ...state, getBlockCardRequestResponse: action.data };
    case VERIFY_BLOCK_MOBILENO_DETAILS:
      return { ...state, getMobilenoVerifyResponse: action.data };
    case APPROVE_BLOCK_STATUS_RESPONSE:
      return { ...state, approveBlockCardResponse: action.data };
    case REJECT_BLOCK_CARD_STATUS_RESPONSE:
      return { ...state, rejectBlockCardResponse: action.data };
    case UPDATE_BLOCK_CARD_REQUEST_DATA:
      return { ...state, updateBlockCardResponse: action.data };
    case ADD_BLOCK_CARD_DETAILS:
      return { ...state, addBlockCardResponse: action.data };
    case CUSTOMER_BLOCK_CARD_DETAILS:
      return { ...state, customerDetailResponse: action.data };
    case CUSTOMER_UNBLOCK_CARD_DETAILS:
      return { ...state, getUnblockCardRequestResponse: action.data };
    case GET_TOGGLE_RESPONSE_RECORDS_DATA:
      return { ...state, toggleDetailResponse: action.data };
    case RESET_GET_TOGGLE_DETAIL:
      return { ...state, toggleDetailResponse: [] };
    case RESET_GET_CUSTOMER_DETAIL:
      return { ...state, customerDetailResponse: [] };
    case RESPONSE_MESSAGE:
      return { ...state, getResponseMessage: action.data };
    default:
      return state;
  }
};
export default BlockCardRequestReducer;
