import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";
var FormData = require("form-data");

export const GET_SALARY_LIST = "GET_SALARY_LIST";
export const GET_TRANSACTION_LIST = "GET_TRANSACTION_LIST";
export const RESET_TRANSACTION_LIST = "RESET_TRANSACTION_LIST";
export const SALARY_UPLOAD_MESSAGE = "SALARY_UPLOAD_MESSAGE";
export const RESET_UPLOAD_MESSAGE = "RESET_UPLOAD_MESSAGE";
export const SALARY_BATCH_DETAIL = "SALARY_BATCH_DETAIL";
export const SALARY_APPROVAL_SUBMIT = "SALARY_APPROVAL_SUBMIT";
export const RESET_APPROVAL_SUBMIT = "RESET_APPROVAL_SUBMIT";
export const SALARY_CHECKER_SUBMIT = "SALARY_CHECKER_SUBMIT";
export const RESET_CHECKER_SUBMIT = "RESET_CHECKER_SUBMIT";
export const GET_PREFUND_BALANCE_OF_THE_COMPANY =
  "GET_PREFUND_BALANCE_OF_THE_COMPANY";
export const DELETE_BATCH = "DELETE_BATCH";
export const RESET_DELETE_BATCH = "RESET_DELETE_BATCH";
export const USER_ACCESS_LEVEL = "USER_ACCESS_LEVEL";
export const SALARY_FILENAME_VALIDATIONS = "SALARY_FILENAME_VALIDATIONS";
export const SALARY_OTP_REQUEST = "SALARY_OTP_REQUEST";
export const SALARY_OTP_RESEND = "SALARY_OTP_RESEND";
export const GET_REJECTION_REPORT = "GET_REJECTION_REPORT";

export const getUserAccess = (functionCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getUserAccessLevel + functionCode;

    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: USER_ACCESS_LEVEL, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const getSalaryFileNameValidations = (companyId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.salaryFileNameValidations + companyId;

    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: SALARY_FILENAME_VALIDATIONS, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const getSalaryUploadBatchList = (CompanyId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getSalaryBatchList;

    try {
      const getResponse = await axios
        .post(apiURL, { companyId: CompanyId })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_SALARY_LIST, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const getSalaryBatchList = (batchId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.salaryBatchDetail + batchId;

    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: SALARY_BATCH_DETAIL, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const resetTransactionList = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_LIST });
  };
};

export const getTransactionList = (
  payrollUpload: any,
  page: number,
  records: any
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.transactionList + payrollUpload?.batchId;
    try {
      const getResponse = await axios
        .get(apiURL, {
          params: {
            limit: page,
            offset: records,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_TRANSACTION_LIST, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const getRejectionReport = (
  payrollUploadId: any,
  page: number,
  records: any
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.transactionList + payrollUploadId;
    try {
      const getResponse = await axios
        .get(apiURL, {
          params: {
            limit: page,
            offset: records,
            transactionStatusCode: "ERROR",
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_REJECTION_REPORT, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const resetUploadMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPLOAD_MESSAGE });
  };
};

export const resetApprovalMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_APPROVAL_SUBMIT });
  };
};

export const resetCheckerMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CHECKER_SUBMIT });
  };
};

export const salaryFileUpload = (fileUploadData: any, companyId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.salaryUpload;
      var formData = new FormData();
      formData.append("file", fileUploadData?.fileupload);
      formData.append("fileType", fileUploadData?.fileType);
      const response = await axios
        .post(apiURL, formData, {
          params: {
            companyId: companyId,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: SALARY_UPLOAD_MESSAGE, data: response });
      }
    } catch (error) {}
  };
};

export const salaryApprovalSubmit = (approvalRequest: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.approvalSubmit;
      const response = await axios
        .post(apiURL, approvalRequest)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });

      if (response) {
        dispatch({ type: SALARY_APPROVAL_SUBMIT, data: response });
        if (response.data) {
        }
      }
    } catch (error) {}
  };
};

export const salaryCheckerSubmit = (checkerRequest: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.salaryCheckerRequest;
      const response = await axios
        .post(apiURL, checkerRequest)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });

      if (response) {
        dispatch({ type: SALARY_CHECKER_SUBMIT, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const requestOtpChecker = (otpRequest: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.salaryOtpRequest;
      const response = await axios.post(apiURL, otpRequest).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });

      if (response) {
        dispatch({ type: SALARY_OTP_REQUEST, data: response });
      }
    } catch (error) {}
  };
};

export const resendOtpChecker = (otpRequest: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.salaryResendOtpRequest;
      const response = await axios.post(apiURL, otpRequest).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });

      if (response) {
        dispatch({ type: SALARY_OTP_RESEND, data: response });
      }
    } catch (error) {}
  };
};

export const deletebatch = (deleteId: string, deleteComments: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deleteBatch;
      const response = await axios
        .post(apiURL, {
          id: deleteId,
          request: deleteComments,
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: DELETE_BATCH, data: response });
        if (response.data) {
        }
      }
    } catch (error) {}
  };
};

export const resetDeleteBatch = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_BATCH });
  };
};

export const deleteTransactionRecord = (deleteId: string, action: string) => {
  return async () => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.deleteTransactionRecord + deleteId;
      const response = await axios
        .post(apiURL, null, {
          params: {
            action: action,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {}
  };
};

export const linkTransactionAccount = (linkId: string) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.linkAccount + linkId;
      const response = await axios.post(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response.data) {
      }
    } catch (error) {}
  };
};

export const getPrefunfBalanceOftheCompany = (accountId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.prefundCompanyGetCompanyBalance +
      accountId;
    try {
      const responseData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (responseData) {
        dispatch({
          type: GET_PREFUND_BALANCE_OF_THE_COMPANY,
          data: responseData.data,
        });
      }
    } catch (error) {}
  };
};
