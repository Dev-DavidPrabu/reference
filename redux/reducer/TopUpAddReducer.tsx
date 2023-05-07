import { GET_SALARY_LIST,GET_TRANSACTION_LIST,RESET_TRANSACTION_LIST,SALARY_UPLOAD_MESSAGE,RESET_UPLOAD_MESSAGE,SALARY_BATCH_DETAIL,SALARY_APPROVAL_SUBMIT, RESET_APPROVAL_SUBMIT, SALARY_CHECKER_SUBMIT, RESET_CHECKER_SUBMIT, GET_PREFUND_BALANCE_OF_THE_COMPANY, DELETE_BATCH, RESET_DELETE_BATCH, USER_ACCESS_LEVEL, SALARY_FILENAME_VALIDATIONS, SALARY_OTP_REQUEST, SALARY_OTP_RESEND, GET_REJECTION_REPORT} from "../action/TopUpAddActions"; 

const initialState = {
  getAllSalaryList: [],
  getAllTransactionList:[],
  salaryUploadMessage:[],
  getSalaryBatchList:[],
  salaryApprovalSubmitMessage:[],
  salaryCheckerSubmitMessage:[],
  deleteBatch:[],
  getUserAccessList:[],
  getSalaryValidations:[],
  getSalaryOtpResponse:[],
  getSalaryResendOtpResponse:[],
  getAllRejectionReport:[]
};

const TopUpAddReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_SALARY_LIST:
      return { ...state, getAllSalaryList: action.data };
      case GET_TRANSACTION_LIST:
        return { ...state, getAllTransactionList: action.data };
      case RESET_TRANSACTION_LIST:
        return { ...state, getAllTransactionList: [] };
      case GET_REJECTION_REPORT:
        return { ...state, getAllRejectionReport: action.data };
      case SALARY_UPLOAD_MESSAGE:
        return { ...state, salaryUploadMessage: action.data};
      case RESET_UPLOAD_MESSAGE:
        return { ...state, salaryUploadMessage: []};
      case SALARY_BATCH_DETAIL:
        return { ...state, getSalaryBatchList: action.data };
      case SALARY_APPROVAL_SUBMIT:
        return { ...state, salaryApprovalSubmitMessage: action.data };
      case RESET_APPROVAL_SUBMIT:
        return { ...state, salaryApprovalSubmitMessage:[] };
      case SALARY_CHECKER_SUBMIT:
        return { ...state, salaryCheckerSubmitMessage: action.data };
      case RESET_CHECKER_SUBMIT:
        return { ...state, salaryCheckerSubmitMessage: [] };
      case GET_PREFUND_BALANCE_OF_THE_COMPANY:
        return { ...state, prefundAccountBalance:action.data}
      case DELETE_BATCH:
        return { ...state, deleteBatch:action.data}
      case RESET_DELETE_BATCH:
        return { ...state, deleteBatch:[]};
      case USER_ACCESS_LEVEL:
        return { ...state, getUserAccessList: action.data };
      case SALARY_FILENAME_VALIDATIONS:
        return { ...state, getSalaryValidations: action.data };
      case SALARY_OTP_REQUEST:
        return { ...state, getSalaryOtpResponse: action.data };
      case SALARY_OTP_RESEND:
        return { ...state, getSalaryResendOtpResponse: action.data };
    default:
      return state;
  }
};
export default TopUpAddReducer;