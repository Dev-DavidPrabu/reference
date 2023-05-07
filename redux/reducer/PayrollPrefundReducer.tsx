import {
  GET_PAYROLL_PREFUND,
  GET_PAYROLL_PREFUND_STAFF,
  POSTAPPROVEPREFUND,
} from "../action/PayrollPrefundAction";

const intialState = {
  getPayrollPrefundCompany: [],
  getPayrollPrefundStaff: [],
  postPayrollPref: [],
};

const PayrollPrefundReducer = (
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
export default PayrollPrefundReducer;
