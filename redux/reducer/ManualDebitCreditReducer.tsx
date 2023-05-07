import {
  GET_MANUAL_DEBIT_CREDIT_LIST,
  CREATE_MANUAL_DEBIT_CREDIT,
  UPDATE_MANUAL_DEBIT_CREDIT,
  RESET_CREATE_MANUAL_DEBIT_CREDIT,
  RESET_UPDATE_MANUAL_DEBIT_CREDIT,
  APPROVE_DEBIT_CREDIT_STATUS,
} from "../action/ManualDebitCreditAction";

const initialState = {
  getManualDebitCreditList: [],
  getManualDebitCreditCreateError: [],
  getManualDebitCreditUpdateError: [],
  getDebitCreditApprove: [],
};

const ManualDebitCreditReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_MANUAL_DEBIT_CREDIT_LIST:
      return { ...state, getManualDebitCreditList: action.data };
    case CREATE_MANUAL_DEBIT_CREDIT:
      return { ...state, getManualDebitCreditCreateError: action.data };
    case UPDATE_MANUAL_DEBIT_CREDIT:
      return { ...state, getManualDebitCreditUpdateError: action.data };
    case APPROVE_DEBIT_CREDIT_STATUS:
      return { ...state, getDebitCreditApprove: action.data };
    case "RESETAPPROVE_DEBIT_CREDIT_STATUS":
      return { ...state, getDebitCreditApprove: [] };
    case RESET_CREATE_MANUAL_DEBIT_CREDIT:
      return { ...state, getManualDebitCreditCreateError: [] };
    case RESET_UPDATE_MANUAL_DEBIT_CREDIT:
      return { ...state, getManualDebitCreditUpdateError: [] };
    default:
      return state;
  }
};
export default ManualDebitCreditReducer;
