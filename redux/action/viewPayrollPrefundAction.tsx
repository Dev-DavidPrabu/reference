import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";
import axios from "axios";
export const PREFUNDTRANSACTIONRESP = "PREFUNDTRANSACTIONRESP";
export const RESET_PAYROLL_PREFUND = "RESET_PAYROLL_PREFUND";

export const viewPrefundList = (id: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.viewPrefundTransaction + id;
    try {
      const prefundTransaction = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });

      if (prefundTransaction) {
        dispatch({
          type: PREFUNDTRANSACTIONRESP,
          data: prefundTransaction.data,
        });
      }
    } catch (error) {}
  };
};

export const resetPayrollPrefund = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: RESET_PAYROLL_PREFUND,
    });
  };
};
