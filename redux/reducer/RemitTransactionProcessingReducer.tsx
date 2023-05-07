import {
  APPROVE_STATUS_RESPONSE,
  APPROVE_REMARK_RESPONSE,
  REJECT_REMARK_RESPONSE,
  GET_BACK_DOC_RES,
  GET_FRONT_DOC_RES,
  GET_PAYMENT_METHOD_LIST,
  GET_TRANSFER_DATA,
  GET_TRANSFER_RECORDS_DATA_BY_ID,
  RESET_GET_TRANSFER_DATA,
  PROCESS_STATUS_RESPONSE,
  PROCESS_STATUS_REJECT,
  GET_STATUS_COUNT_DATA,
  GET_STATUS_COUNT_TABLE_DATA,
  RESET_GET_STATUS_COUNT_TABLE_DATA,
  GET_COMPLAINCE_SENDER_INFO,
  GET_COMPLAINCE_ON_BEHALF_SENDER_INFO,
  UPDATE_MATCHTYPE__RESPONSE,
  GET_AUDIT_CONFIRMMATCH_INFO,
  UPDATE_CUSTOMER_CW_FAILED_INFO,
  RESET_STATUS_RESPONSE,
} from "../action/RemitTransactionProcessingAction";

const initialState = {
  getCountTableDataResponse: [],
  getProcessStatusResponse: [],
};

const RemitTransactionProcessingReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_TRANSFER_RECORDS_DATA_BY_ID:
      return { ...state, getTransferRecordsByIdResponse: action.data };
    case GET_TRANSFER_DATA:
      return { ...state, getTransferDataRecordsResponse: action.data };
    case RESET_GET_TRANSFER_DATA:
      return { ...state, getTransferDataRecordsResponse: [] };
    case APPROVE_STATUS_RESPONSE:
      return { ...state, getApproveStatusResponse: action.data };
    case APPROVE_REMARK_RESPONSE:
      return { ...state, getApproveRemarkResponse: action.data };
    case REJECT_REMARK_RESPONSE:
      return { ...state, getRejectRemarkResponse: action.data };
    case PROCESS_STATUS_RESPONSE:
      return { ...state, getProcessStatusResponse: action.data };
    case RESET_STATUS_RESPONSE:
      return { ...state, getProcessStatusResponse: [] };
    case PROCESS_STATUS_REJECT:
      return { ...state, getProcessStatusReject: action.data };
    case GET_PAYMENT_METHOD_LIST:
      return { ...state, getPaymentMethodResponse: action.data };
    case GET_STATUS_COUNT_TABLE_DATA:
      return { ...state, getCountTableDataResponse: action.data };
    case GET_FRONT_DOC_RES:
      return { ...state, getFrontDocResponse: action.data };
    case GET_BACK_DOC_RES:
      return { ...state, getBackDocResponse: action.data };
    case GET_STATUS_COUNT_DATA:
      return { ...state, getStatusCountResponse: action.data };
    case RESET_GET_STATUS_COUNT_TABLE_DATA:
      return { ...state, getCountTableDataResponse: [] };
    case GET_COMPLAINCE_SENDER_INFO:
      return { ...state, getComplainceSenderInfo: action.data };
    case GET_COMPLAINCE_ON_BEHALF_SENDER_INFO:
      return { ...state, getComplainceOnBehalfSenderInfo: action.data };
    case UPDATE_MATCHTYPE__RESPONSE:
      return { ...state, getUpdateMatchTypeResponse: action.data };
    case GET_AUDIT_CONFIRMMATCH_INFO:
      return { ...state, getAuditConfirmMatchInfo: action.data };
    case UPDATE_CUSTOMER_CW_FAILED_INFO:
      return { ...state, getCustomerCwFailed: action.data };
    default:
      return state;
  }
};
export default RemitTransactionProcessingReducer;
