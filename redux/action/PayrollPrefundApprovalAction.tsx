import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";
import axios from "axios";

export const GET_PAYROLL_PREFUND = "GET_PAYROLL_PREFUND";
export const GET_PAYROLL_PREFUND_STAFF = "GET_PAYROLL_PREFUND_STAFF";
export const POSTAPPROVEPREFUND = "POSTAPPROVEPREFUND";

export const getPayrollPrefundApproval = (page: number, records: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.PayrollPrefundCompanyUser;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNo: page,
            noOfRecords: records,
          },
        })
        .then((response) => {
          dispatch({ type: GET_PAYROLL_PREFUND, data: response.data });
        });
    } catch (error) {}
  };
};

export const getPayrollPrefundApprovalStaff = (
  page: number,
  records: any,
  companyId: any = null
) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.PayrollPrefundStaff;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNo: page,
            noOfRecords: records,
            companyId: companyId ?? null,
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
        dispatch({ type: GET_PAYROLL_PREFUND_STAFF, data: response.data });
      }
    } catch (error) {}
  };
};

export const getPayrollPrefundCompanyList = (
  userLevel: string,
  getCompanyList: Function
) => {
  const apiURL = `${Constants.BaseURL}${ApiEndPoints.payrollPrefundCompanyList}${userLevel}`;

  try {
    axios
      .get(apiURL)
      .then((res) => {
        getCompanyList(res?.data?.data);
      })
      .catch((err) => {});
  } catch (error) {}
};

export const PayrollPrefundApprovalApprove = (data: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.prefundApro;
    try {
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: POSTAPPROVEPREFUND, data: response.data });
      }
    } catch (error) {}
  };
};

export const approvePayrollPrefundApproval = (
  id: any,
  status: string,
  remarks: any,
  level: any,
  history: any
) => {
  let data = {
    id: id,
    status: status,
    remarks: remarks ?? "Test APPROVE",
    level: level,
  };
  return async (dispatch: Dispatch) => {
    const apiURL = `${Constants.BaseURL}${ApiEndPoints.approvePath}`;
    try {
      const approvePayrollPrefundRes = await axios
        .post(apiURL, data)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (approvePayrollPrefundRes) {
        const response= await axios
        .get(Constants.BaseURL + ApiEndPoints.PayrollPrefundStaff, {
          params: {
            pageNo: 0,
            noOfRecords: 10,
            companyId: null,
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
        dispatch({ type: GET_PAYROLL_PREFUND_STAFF, data: response.data });
      }
        if (approvePayrollPrefundRes.error === undefined) {
          if (level === "1") {
            if (status === "APPROVE") {
              history.push({
                pathname: "/dashboard/PayrollPrefund",
                state: "Payroll Prefund Created Successfully",
              });
            } else {
              history.push({
                pathname: "/dashboard/PayrollPrefund",
                state: "Payroll Prefund Reject Successfully",
              });
            }
          } else if (level === "2") {
            if (status === "APPROVE") {
              history.push({
                pathname: "/dashboard/PayrollPrefundApproval",
                state: "Payroll Prefund Verified Successfully",
              });
            } else {
              history.push({
                pathname: "/dashboard/PayrollPrefundApproval",
                state: "Payroll Prefund Reject Successfully",
              });
            }
          }
          else if (level === "3") {
            if (status === "APPROVE") {
              history.push({
                pathname: "/dashboard/PayrollPrefundApproval",
                state: "Payroll Prefund Approved Successfully",
              });
            } else {
              history.push({
                pathname: "/dashboard/PayrollPrefundApproval",
                state: "Payroll Prefund Reject Successfully",
              });
            }
          }
        }
      }
    } catch (error) {}
  };
};
