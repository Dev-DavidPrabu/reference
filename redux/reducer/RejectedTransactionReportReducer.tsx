import {
  GET_REJECTED_TRANSACTION_REPORT,
  GET_REJETCED_TRANSACTION_DOWNLOAD,
  RESET_REJECTED_TRANSACTION_DOWNLOADEXCEL,
  RESET_REJECTED_TRANSACTION_DOWNLOADPDF,
  RESET_REJECTED_TRANSACTION_REPORT,
  RESET_REJECTED_TRANSACTION_DOWNLOAD,
  GET_REJETCED_TRANSACTION_DOWNLOADEXCEL,
} from "../action/RejectedTransactionReportAction";

const initialState = {
  getRejectedTransactionResponse: [],
  getRejectedTransactionPdfResponse: undefined,
  getRejectedTransactionEXCELResponse: undefined,
};
const RejectedTransactionReportReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_REJECTED_TRANSACTION_REPORT: {
      return { ...state, getRejectedTransactionResponse: action.data };
    }
    case GET_REJETCED_TRANSACTION_DOWNLOAD: {
      return { ...state, getRejectedTransactionPdfResponse: action.data };
    }
    case GET_REJETCED_TRANSACTION_DOWNLOADEXCEL: {
      return { ...state, getRejectedTransactionEXCELResponse: action.data };
    }
    case RESET_REJECTED_TRANSACTION_REPORT: {
      return { ...state, getRejectedTransactionResponse: [] };
    }
    case RESET_REJECTED_TRANSACTION_DOWNLOAD: {
      return { ...state, getRejectedTransactionPdfResponse: [] };
    }
    case RESET_REJECTED_TRANSACTION_DOWNLOADPDF: {
      return { ...state, getRejectedTransactionPdfResponse: undefined };
    }
    case RESET_REJECTED_TRANSACTION_DOWNLOADEXCEL: {
      return { ...state, getRejectedTransactionEXCELResponse: undefined };
    }

    default:
      return state;
  }
};

export default RejectedTransactionReportReducer;
