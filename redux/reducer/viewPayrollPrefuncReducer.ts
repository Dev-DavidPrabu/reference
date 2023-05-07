import { PREFUNDTRANSACTIONRESP, RESET_PAYROLL_PREFUND } from "../action/viewPayrollPrefundAction";

const initialState = {
  viewPrefundResponse: [],
};

const ViewPayrollPrefundReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case PREFUNDTRANSACTIONRESP:
      return { ...state, viewPrefundResponse: action.data };
    case RESET_PAYROLL_PREFUND:
      return { ...state, viewPrefundResponse: [] };
    default:
      return state;
  }
};
export default ViewPayrollPrefundReducer;
