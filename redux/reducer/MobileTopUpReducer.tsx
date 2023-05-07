import {
  APPROVE_MOBILE_TOPUP_CREDIT_RESPONSE,
  APPROVE_MOBILE_TOPUP_FPX_REFUNCREDIT_RESPONSE,
  APPROVE_MOBILE_TOPUP_FPX_REPROCESS_RESPONSE,
  APPROVE_MOBILE_TOPUP_JOMPAY_REFUNDCREDIT_RESPONSE,
  APPROVE_MOBILE_TOPUP_JOMPAY_REPROCESS_RESPONSE,
  APPROVE_MOBILE_TOPUP_REFUND_RESPONSE,
  APPROVE_MOBILE_TOPUP_REPROCESS_RESPONSE,
  MOBILE_DASHBOARD_DATA,
  MOBILE_DASHBOARD_DATA_BYSTATUS,
  MOBILE_FILTER_DATA_BYSTATUS,
  RESET_MOBILE_DASHBOARD,
  RESET_MOBILE_DASHBOARD_DATA_BYSTATUS,
  MOBILE_DOCUMENT_DOWNLOAD_DATA,
  MOBILE_DOCUMENT_DATA,
  RESET_MOBILE_DOCUMENT_DATA,
  RESET_MOBILE_DOCUMENT_DOWNLOAD,
  RESET_FILTER_DATA_BYSTATUS
} from "../action/MobileTopUpAction";

const initialState = {
  getAllDashBoardResponse: [],
  getDataByStatusResponse: [],
  getMobileDocumentData: [],
  getMobileDocumentDownloadData: []
};

const MobileTopUpReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case MOBILE_DASHBOARD_DATA:
      return { ...state, getAllDashBoardResponse: action.data };
    case RESET_MOBILE_DASHBOARD:
      return { ...state, getAllDashBoardResponse: [] };
    case MOBILE_DASHBOARD_DATA_BYSTATUS:
      return { ...state, getDataByStatusResponse: action.data };
    case APPROVE_MOBILE_TOPUP_REPROCESS_RESPONSE:
      return { ...state, getApproveReprocessResponse: action.data };
    case APPROVE_MOBILE_TOPUP_REFUND_RESPONSE:
      return { ...state, getApproveRefundResponse: action.data };
    case APPROVE_MOBILE_TOPUP_CREDIT_RESPONSE:
      return { ...state, getApproveCreditResponse: action.data };
    case MOBILE_FILTER_DATA_BYSTATUS:
      return { ...state, getFilteredDateresponse: action.data };
    case RESET_FILTER_DATA_BYSTATUS:
      return { ...state, getFilteredDateresponse: [] };
    case RESET_MOBILE_DASHBOARD_DATA_BYSTATUS:
      return { ...state, getDataByStatusResponse: [] };
    case APPROVE_MOBILE_TOPUP_FPX_REPROCESS_RESPONSE:
      return { ...state,getFpxResponseByReprocess: action.data } ;
    case APPROVE_MOBILE_TOPUP_FPX_REFUNCREDIT_RESPONSE:
      return { ...state,getFpxResponseByRefundCredit: action.data };
    case APPROVE_MOBILE_TOPUP_JOMPAY_REPROCESS_RESPONSE:
      return { ...state,getJompayResponseByReprocess: action.data };
    case APPROVE_MOBILE_TOPUP_JOMPAY_REFUNDCREDIT_RESPONSE:
      return { ...state,getJompayRefundCreditByReprocess: action.data}
    case MOBILE_DOCUMENT_DATA:
      return { ...state, getMobileDocumentData: action.data };
    case RESET_MOBILE_DOCUMENT_DATA:
      return { ...state, getMobileDocumentData: [] }
    case MOBILE_DOCUMENT_DOWNLOAD_DATA:
      return { ...state, getMobileDocumentDownloadData: action.data }
    case RESET_MOBILE_DOCUMENT_DOWNLOAD:
      return { ...state, getMobileDocumentDownloadData: [] }
    default:
      return state;
  }
};
export default MobileTopUpReducer;
