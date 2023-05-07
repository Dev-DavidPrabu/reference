import {
  RESET_COMAPNY_INFO,
  RESET_CREATED_COMAPNY_INFO,
  GET_SELECTED_COMPANY_DATA,
  DELETE_PAYROLL_COMPANY,
  GET_ALL_COMPANY_DATA,
  POST_NEW_PAYROLL_COMPANY,
  UPDATE_PAYROLL_COMPANY,
  USER_DATA,
  RESET_DELETE_COMAPNY_INFO,
  GET_TRANSACTION_OF_COMPANY,
  RESET_TRANSACTION_OF_COMPANY,
  GETALLBRANCHDATAWITHCODE,
} from "../action/CompanyMaintenanceAction";

const initialState = {
  getAllCompanyDataResponse: [],
  postNewPayrollCompanytDataResponse: [],
  updatePayrollCompanyResponse: [],
  deletePayrollCompanyResponse: [],
  selectedCompanyResponse: [],
  getallUserResponce: [],
  getCompanyTransaction: [],
  getAllbranchdetailwithname: [],
};

const CompanyMaintenanceReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ALL_COMPANY_DATA:
      return {
        ...state,
        getAllCompanyDataResponse: action.data,
        getallUserResponce: [],
      };
    case GETALLBRANCHDATAWITHCODE:
      return { ...state, getAllbranchdetailwithname: action.data };
    case POST_NEW_PAYROLL_COMPANY:
      return {
        ...state,
        postNewPayrollCompanytDataResponse: action.data,
        getAllCompanyDataResponse: [],
      };
    case UPDATE_PAYROLL_COMPANY:
      return {
        ...state,
        updatePayrollCompanyResponse: action.data,
        getAllCompanyDataResponse: [],
      };
    case DELETE_PAYROLL_COMPANY:
      return {
        ...state,
        deletePayrollCompanyResponse: action.data,
        getAllCompanyDataResponse: [],
      };
    case RESET_DELETE_COMAPNY_INFO:
      return {
        ...state,
        deletePayrollCompanyResponse: [],
        getAllCompanyDataResponse: [],
      };
    case GET_TRANSACTION_OF_COMPANY:
      return {
        ...state,
        getCompanyTransaction: action.data,
      };
    case RESET_TRANSACTION_OF_COMPANY:
      return {
        ...state,
        getCompanyTransaction: [],
      };
    case GET_SELECTED_COMPANY_DATA:
      return {
        ...state,
        selectedCompanyResponse: action.data,
        getAllCompanyDataResponse: [],
      };
    case RESET_COMAPNY_INFO:
      return {
        ...state,
        selectedCompanyResponse: [],
        getAllCompanyDataResponse: [],
      };
    case RESET_CREATED_COMAPNY_INFO:
      return {
        ...state,
        postNewPayrollCompanytDataResponse: undefined,
        getAllCompanyDataResponse: [],
      };
    case USER_DATA:
      return {
        ...state,
        getallUserResponce: action.data,
        getAllCompanyDataResponse: [],
      };
    default:
      return state;
  }
};
export default CompanyMaintenanceReducer;
