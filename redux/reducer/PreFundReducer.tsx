import {
  GET_ALL_PREFUND_DATA,
  ADD_NEW_TRANSCATION_DATA,
  RESET_API_GATE_WAY_LOGIN_INFO,
  RESET_CREATE_INO,
  SELECTED_TRANSCATION_INFO,
  GET_CURRENT_BALANCE_OF_THE_COMPANY,
  GET_COMPANY_USER,
  ADD_NEW_USER_COMPANY,
  DELETE_COMPANY_USER,
  RESET_CREATE_USER_INFO,
  PROOF_UPLOADED,
  POST_PAYROLL_PREFUND,
  GET_BANKNAME,
} from "../action/PreFundAction";
const initialState = {
  getAllCompanyDataResponse: [],
  addNewTranscationResponse: [],
  loginResponse: {},
  trailloginResponse: {},
  companyUserList: [],
  addNewUserToCompanyResponse: [],
  proofUploadResponse: [],
  postAddData: [],
  getbankdetails: [],
};
const PreFundReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ALL_PREFUND_DATA:
      return { ...state, getAllPreFundDataResponse: action.data };
    case ADD_NEW_TRANSCATION_DATA:
      return { ...state, addNewTranscationResponse: action.data };
    case PROOF_UPLOADED:
      return { ...state, proofUploadResponse: action.data };
    case RESET_CREATE_INO:
      return { ...state, addNewTranscationResponse: [] };
    case SELECTED_TRANSCATION_INFO:
      return { ...state, selectedTranscationInfo: action.data };
    case GET_CURRENT_BALANCE_OF_THE_COMPANY:
      return { ...state, currentBalanceResponse: action.data };
    case GET_BANKNAME:
      return { ...state, getbankdetails: action.data };
    case GET_COMPANY_USER:
      return { ...state, companyUserList: action.data };
    case ADD_NEW_USER_COMPANY:
      return { ...state, addNewUserToCompanyResponse: action.data };
    case RESET_CREATE_USER_INFO:
      return { ...state, addNewUserToCompanyResponse: [] };
    case DELETE_COMPANY_USER:
      return { ...state, delteCompanyUserResponse: action.data };
    case RESET_API_GATE_WAY_LOGIN_INFO:
      return { ...state, trailloginResponse: {} };
    case POST_PAYROLL_PREFUND:
      return { ...state, postAddData: action.data };
    default:
      return { ...state };
  }
};

export default PreFundReducer;
