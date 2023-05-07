import {
  GET_PAYROLL_PREFUND,
  GET_PAYROLL_PREFUND_STAFF,
  POSTAPPROVEPREFUND,
} from "../action/PayrollPrefundApprovalAction";

const intialState = {
  getPayrollPrefundCompany: [],
  getPayrollPrefundStaff: [],
  postPayrollPref: [],
};

const PayrollPrefundApprovalReducer = (
  state = intialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_PAYROLL_PREFUND:
      return { ...state, getPayrollPrefundCompany: action.data };
    case GET_PAYROLL_PREFUND_STAFF:
      return { ...state, getPayrollPrefundStaff: action.data };
    case POSTAPPROVEPREFUND:
      return { ...state, postPayrollPref: action.data };
    default:
      return state;
  }
};
export default PayrollPrefundApprovalReducer;
