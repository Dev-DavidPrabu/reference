import {
  ADD_UNBLOCK_CARD_DETAILS,
  ADD_UNBLOCK_MOBILENO_DETAILS,
  APPROVE_UNBLOCK_STATUS_RESPONSE,
  GET_IDTYPE_CARD_UNBLOCK_RESPONSE,
  GET_UNBLOCK_CARD_RECORDS_DATA,
  PROOF_DOC_SELFIE_UPLOAD,
  REJECT_UNBLOCK_CARD_STATUS_RESPONSE,
  RESET_ADD_DATA,
  RESET_APPROVE_DATA,
  RESET_VERIFY_DATA,
  RESPONSE_MESSAGE,
  USER_ACCESS_LEVEL_UNBLOCK,
  VERIFY_UNBLOCK_MOBILENO_DETAILS,
  RESET_RESPONSE_MSG
} from "../action/CardUnBlockAction";

const initialState = {
  getUnBlockCardRequestResponse: [],
  addUnBlockCardResponse: [],
  docSelfieUploadResponse: [],
  getUnblockResponseMessage: [],
};

const CardUnBlockReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_UNBLOCK_CARD_RECORDS_DATA:
      return { ...state, getUnBlockCardRequestResponse: action.data };
    case USER_ACCESS_LEVEL_UNBLOCK:
      return { ...state, getUserAccessResponse: action.data };
    case RESET_APPROVE_DATA:
      return { ...state, getResetApproveResponse: [] };
    case RESET_ADD_DATA:
      return { ...state, addUnBlockCardResponse: [] };
    case ADD_UNBLOCK_MOBILENO_DETAILS:
      return { ...state, getUnBlockCardMobileNoResponse: action.data };
    case RESET_VERIFY_DATA:
      return { ...state, getUnBlockCardMobileNoResponse: [] };
    case VERIFY_UNBLOCK_MOBILENO_DETAILS:
      return { ...state, getVerifyUnBlockCardMobileNoResponse: action.data };
    case APPROVE_UNBLOCK_STATUS_RESPONSE:
      return { ...state, approveUnBlockCardResponse: action.data };
    case REJECT_UNBLOCK_CARD_STATUS_RESPONSE:
      return { ...state, rejectUnBlockCardResponse: action.data };
    case ADD_UNBLOCK_CARD_DETAILS:
      return { ...state, addUnBlockCardResponse: action.data };
    case GET_IDTYPE_CARD_UNBLOCK_RESPONSE:
      return { ...state, idTypeResponse: action.data };
    case PROOF_DOC_SELFIE_UPLOAD:
      return { ...state, docSelfieUploadResponse: action.data };
    case RESPONSE_MESSAGE:
      return { ...state, getUnblockResponseMessage: action.data };
    case RESET_RESPONSE_MSG:
      return {...state,getUnblockResponseMessage:[]}
    default:
      return state;
  }
};
export default CardUnBlockReducer;
