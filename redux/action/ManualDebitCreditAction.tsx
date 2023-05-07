import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_MANUAL_DEBIT_CREDIT_LIST = "GET_MANUAL_DEBIT_CREDIT_LIST";
export const CREATE_MANUAL_DEBIT_CREDIT = "CREATE_MANUAL_DEBIT_CREDIT";
export const UPDATE_MANUAL_DEBIT_CREDIT = "UPDATE_MANUAL_DEBIT_CREDIT";
export const RESET_CREATE_MANUAL_DEBIT_CREDIT =
  "RESET_CREATE_MANUAL_DEBIT_CREDIT";
export const RESET_UPDATE_MANUAL_DEBIT_CREDIT =
  "RESET_UPDATE_MANUAL_DEBIT_CREDIT";
export const APPROVE_DEBIT_CREDIT_STATUS = "APPROVE_DEBIT_CREDIT_STATUS";

export const getManualDebitCreditList = (companyId: any = null) => {
  return async (dispatch: Dispatch) => {
    let apiURL;
    if (companyId !== null) {
      apiURL = `${Constants.BaseURL}${ApiEndPoints.debitcreditcompanyList}${companyId}`;
    } else {
      apiURL = `${Constants.BaseURL}${ApiEndPoints.manualDebitCreditSummaryList}`;
    }
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNo: 0,
            noOfRecords: 10,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({
          type: GET_MANUAL_DEBIT_CREDIT_LIST,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const resetManualDebitCreditCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_MANUAL_DEBIT_CREDIT });
  };
};

export const createManualDebitCreditData = (data: any, history: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createManualDebitCredit;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });

      if (response) {
        let transactionType = response?.data?.transactionType;
        console.log(transactionType, "transactionType");
        dispatch({ type: CREATE_MANUAL_DEBIT_CREDIT, data: response });
        if (response.data) {
          history.push({
            pathname: "/dashboard/manual-debit-credit/debit-credit-summary",
            state: "Debit/Credit Transaction created successfully",
            transactionType: transactionType,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetManualDebitCreditUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_MANUAL_DEBIT_CREDIT });
  };
};

export const getCompanyData = (companyId: any, getCurrentBal: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = `${Constants.BaseURL}${ApiEndPoints.prefundCompanyGetCompanyBalance}${companyId}`;
      await axios.get(apiURL).then((response) => {
        if (response) {
          getCurrentBal(response.data.data);
        } else {
          return false;
        }
      });
    } catch (error) {}
  };
};

export const getDebitCreditCompanyList = (getCompanyList: Function) => {
  const apiURL = `${Constants.BaseURL}${ApiEndPoints.getAllCompanyList}`;

  try {
    axios
      .get(apiURL)
      .then((res) => {
        getCompanyList(res?.data?.data);
      })
      .catch((err) => {});
  } catch (error) {}
};

export const approveDebitCreditReset = () => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: "RESETAPPROVE_DEBIT_CREDIT_STATUS",
    });
};

export const approveDebitCredit = (
  id: any,
  status: string,
  remarks: any,
  level: string,
  history: any
) => {
  let data = {
    id: id,
    status: status,
    remarks: remarks,
    level: level,
  };
  return async (dispatch: Dispatch) => {
    const apiURL = `${Constants.BaseURL}${ApiEndPoints.manualDebit}`;
    try {
      const approveDebitCreditRes = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approveDebitCreditRes) {
        dispatch({
          type: APPROVE_DEBIT_CREDIT_STATUS,
          data: approveDebitCreditRes,
        });

        if (approveDebitCreditRes.error === undefined) {
          if (status === "REJECT") {
            history.push({
              pathname: "/dashboard/manual-debit-credit/debit-credit-summary",
              state: "Debit/Credit Transaction Rejected successfully",
            });
          } else {
            history.push({
              pathname: "/dashboard/manual-debit-credit/debit-credit-summary",
              state: "Debit/Credit Transaction Approved successfully",
            });
          }
        }
      }
    } catch (error) {}
  };
};
